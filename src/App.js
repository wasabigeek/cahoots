import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

import HostRoute from './routes/HostRoute'
import PlayRoute from './routes/PlayRoute'


const UrlGenerator = props => {
  const [apiKey, setApiKey] = useState('');
  const [baseId, setBaseId] = useState('');
  const gameId = window.btoa(JSON.stringify({apiKey, baseId}))
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
            <PlayRoute />
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
