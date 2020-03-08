import Airtable from 'airtable';

const initDatabase = gameId => {
  const [apiKey, baseId] = atob(gameId).split('__')
  console.log(apiKey, baseId)
  Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
  return Airtable.base(baseId)
}

export default initDatabase
