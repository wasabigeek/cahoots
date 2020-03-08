import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import './App.css';

import HostRoute from './routes/HostRoute'
import GameDatabase from './utils/GameDatabase'


const CurrentQuestion = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const database = new GameDatabase({ gameId })
    database.getCurrentQuestion().then(data => setQuestion(data))
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
      <Link to={`/games/${encodeURI(gameId)}/host`}>
        <button>Host Game</button>
      </Link>
      <div>
        Join URL:
        {`${window.location}games/${encodeURI(gameId)}/join`}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/games/:gameId/host">
            <HostRoute />
          </Route>
          <Route path="/games/:gameId/play">
            <CurrentQuestion />
          </Route>
          <Route path="/">
            <UrlGenerator />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
