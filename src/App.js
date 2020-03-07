import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import './App.css';


const initDatabase = gameId => {
  const [apiKey, baseId] = atob(gameId).split('__')
  console.log(apiKey, baseId)
  Airtable.configure({endpointUrl: 'https://api.airtable.com', apiKey})
  return Airtable.base(baseId)
}

const CurrentQuestion = props => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const gameId = new URLSearchParams(window.location.search).get('gameId')

    initDatabase(gameId)('Questions')
      .select({
        // pick next unfinished question
        filterByFormula: `IS_AFTER({Finished At}, NOW())`,
        maxRecords: 1,
        sort: [{field: "Finished At", direction: "asc"}]
      })
      .firstPage()
      .then(questions => setQuestion(questions[0]))
      //.catch
  }, []);

  if (question) {
    return (
      <div>
        <div>{question.get('Name')}</div>
        <ol>
          <li>{question.get('Answer A')}</li>
          <li>{question.get('Answer B')}</li>
          <li>{question.get('Answer C')}</li>
          <li>{question.get('Answer D')}</li>
        </ol>
      </div>
    )
  }
  else {
    return <div>No more questions!</div>
  }
};

const UrlGenerator = props => {
  const [apiKey, setApiKey] = useState('');
  const [baseId, setBaseId] = useState('');
  const gameId = window.btoa([apiKey, baseId].join('__'))
  return (
    <div>
      <div>
        <label>
          API Key:
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </label>
        <label>
          Base ID:
          <input value={baseId} onChange={e => setBaseId(e.target.value)} />
        </label>
      </div>
      <div>
        {`${window.location}?gameId=${encodeURI(gameId)}`}
      </div>
    </div>
  )
}

// const HostHub = props => {
//   return (
//     <div>
//       <div></div>
//     </div>
//   )
// }

function App() {
  return (
    <div className="App">
      <CurrentQuestion />
    </div>
  );
}

export default App;
