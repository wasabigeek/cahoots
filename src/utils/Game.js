import Airtable from 'airtable';

class Game {
  constructor({ gameId }) {
    const [apiKey, baseId] = atob(gameId).split('__')
    Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
    this.game = Airtable.base(baseId)

    this.getAllQuestions = this.getAllQuestions.bind(this)
    this.startNextQuestion = this.startNextQuestion.bind(this)
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this)
  }

  getAllQuestions() {
    return this.game('Questions')
      .select({ sort: [{field: "Order", direction: "asc"}] })
      .all()
  }

  async startNextQuestion() {
    const nextQuestions = await this.game('Questions')
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
    const [err, records] = await this.game('Questions').update([
      {
        "id": nextQuestion.id,
        "fields": { "Finished At": `${finishedTime.toISOString()}` }
      }
    ])

    return records
  }

  async getCurrentQuestion() {
    let data = null
    await this.game('Questions')
      .select({
        // pick next unfinished question
        filterByFormula: `IS_AFTER({Finished At}, NOW())`,
        maxRecords: 1,
        // sort: [{field: "Finished At", direction: "asc"}]
      })
      .firstPage()
      .then(questions => data = questions[0])
      // catch

    return data
  }
}

export default Game
