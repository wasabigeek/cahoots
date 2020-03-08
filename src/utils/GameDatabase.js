import Airtable from 'airtable';

class GameDatabase {
  constructor({ gameId }) {
    const [apiKey, baseId] = atob(gameId).split('__')
    console.log(apiKey)
    Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
    this.database = Airtable.base(baseId)
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
