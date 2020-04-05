import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HostRoute from './routes/HostRoute'
import JoinRoute from './routes/JoinRoute'
import PlayerRoute from './routes/PlayerRoute'
import HomeRoute from './routes/HomeRoute';
import QuestionResultsRoute from './routes/QuestionResultsRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/games/:gameId/host">
            <HostRoute />
          </Route>
          <Route path="/games/:gameId/results/:questionId">
            <QuestionResultsRoute />
          </Route>
          <Route path="/games/:gameId/players/:playerId">
            <PlayerRoute />
          </Route>
          <Route path="/games/:gameId/join">
            <JoinRoute />
          </Route>
          <Route path="/">
            <HomeRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
