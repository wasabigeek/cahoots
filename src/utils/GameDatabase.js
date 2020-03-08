import Airtable from 'airtable';

class GameDatabase {
  constructor({ gameId }) {
    const [apiKey, baseId] = atob(gameId).split('__')
    console.log(apiKey)
    Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
    this.database = Airtable.base(baseId)
  }

  // for future "list all" type calls
  // .select({
  //   // pick next unfinished question
  //   filterByFormula: `OR(IS_AFTER({Finished At}, NOW()), {Finished At} = BLANK())`,
  //   sort: [{field: "Order", direction: "asc"}]
  // })
  // .eachPage((records, fetchNextPage) => {
  //   questions = questions.concat(records)
  //   fetchNextPage()
  // },
  // (err) => {
  //   if (err) { console.log(err); return }
  // })

  async startNextQuestion() {
    const nextQuestions = await this.database('Questions')
      .select({
        filterByFormula: `{Finished At} = BLANK()`,
        maxRecords: 1,
        sort: [{field: "Order", direction: "asc"}],
      })
      .firstPage()

    const nextQuestion = nextQuestions[0]
    if (nextQuestion === undefined) {
      return
    }

    // add 20 seconds
    const finishedTime = new Date(Date.now() + 20000)
    this.database('Questions').update([
      {
        "id": nextQuestion.id,
        "fields": { "Finished At": `${finishedTime.toISOString()}` }
      }
    ],
    (err, records) => {
      if (err) {
        console.error(err)
        return
      }
      records.forEach(function(record) {
        console.log(record.get('Correct Answer'))
      })
    })
  }

  async getCurrentQuestion() {
    let data = null
    await this.database('Questions')
      .select({
        // pick next unfinished question
        filterByFormula: `IS_AFTER({Finished At}, NOW())`,
        maxRecords: 1,
        sort: [{field: "Finished At", direction: "asc"}]
      })
      .firstPage()
      .then(questions => data = questions[0])
      // catch

    return data
  }
}

export default GameDatabase
