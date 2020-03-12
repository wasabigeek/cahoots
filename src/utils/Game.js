import Airtable from 'airtable';

class Game {
  constructor({ gameId }) {
    const { apiKey, baseId } = JSON.parse(atob(gameId))
    Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
    this.game = Airtable.base(baseId)

    this.getAllQuestions = this.getAllQuestions.bind(this)
    this.startNextQuestion = this.startNextQuestion.bind(this)
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this)
  }

  addPlayer(playerName) {
    return this.game('Players')
      .create({"Name": playerName})
      .then(record => record.getId())
      // .catch
  }

  async addAnswer(playerId, answer) {
    const questionId = await this.getCurrentQuestion().then(record => record.getId())

    return this.game('Answers')
      .create({
        "Answer": answer,
        "Player": [ playerId ],
        "Question": [ questionId ]
      })
      .then(record => record.getId())
      // .catch
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
    // filters seem to take longer to update, so we do it ourselves
    await this.getAllQuestions()
      .then(questions => {
        data = questions.find(q => {
          let finished = q.get('Finished At') ? new Date(q.get('Finished At')) : new Date + 1
          return finished > new Date
        })
      })

    return data
  }
}

export default Game
