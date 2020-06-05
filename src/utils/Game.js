import Airtable from 'airtable';
import Question from '../entities/question';

class Game {
  constructor({ gameId }) {
    const { apiKey, baseId } = JSON.parse(atob(gameId))
    Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
    this.game = Airtable.base(baseId)

    this._getAllQuestions = this._getAllQuestions.bind(this)
    this.startNextQuestion = this.startNextQuestion.bind(this)
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this)
  }

  addPlayer(playerName) {
    return this.game('Players')
      .create({"Name": playerName})
      .then(record => record.getId())
      // .catch
  }

  getPlayer(playerId) {
    return this.game('Players')
      .find(playerId)
  }

  getPlayers() {
    return this.game('Players')
      .select()
      .all()
  }

  async addAnswer(playerId, answer) {
    const question = await this.getCurrentQuestion()
    if (question === undefined) {
      throw new Error("Question has not started!")
    }

    return this.game('Answers')
      .create({
        "Answer": answer,
        "Player": [ playerId ],
        "Question": [ question.id ]
      })
      // answer is not used now, but if we do use it we should convert it to an entity
      .then(record => { return { answer: record, question: question }})
      // .catch
  }

  getQuestion(questionId) {
    return this.game('Questions')
      .find(questionId)
      .then(data => convertAirtableQuestion(data));
  }

  _getAllQuestions() {
    return this.game('Questions')
      .select({ sort: [{field: "Order", direction: "asc"}] })
      .all()
  }

  async getAnswers(questionId) {
    let answerIds = await this.game('Questions')
      .find(questionId)
      .then(record => record.get('Answers'))
    if (answerIds === undefined) { answerIds = [] }

    const formula = `OR(${answerIds.map(id => `RECORD_ID()="${id}"`).join(',')})`

    return this.game('Answers')
      .select({
        filterByFormula: formula
      })
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
    await this.game('Questions').update([
      {
        "id": nextQuestion.id,
        "fields": { "Finished At": `${finishedTime.toISOString()}` }
      }
    ])
  }

  async getCurrentQuestion() {
    let data = null
    // filters seem to take longer to update, so we do it ourselves
    await this._getAllQuestions()
      .then(questions => {
        data = questions.find(q => {
          let finished = q.get('Finished At') ? new Date(q.get('Finished At')) : new Date() + 1
          return finished > new Date()
        })
      })

    return convertAirtableQuestion(data);
  }
}

// convert Airtable object to internal Question object
const convertAirtableQuestion = data => {
  return data ? new Question({
    id: data.getId(),
    text: data.get('Name'),
    answerA: data.get('Answer A'),
    answerB: data.get('Answer B'),
    answerC: data.get('Answer C'),
    answerD: data.get('Answer D'),
    correctAnswer: data.get('Correct Answer'),
    finishedAt: data.get('Finished At'),
  }) : null ;
}


export default Game
