import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import JoinRoute from './routes/JoinRoute'
import PlayerRoute from './routes/PlayerRoute'
import HomeRoute from './routes/HomeRoute';
import LobbyRoute from './routes/LobbyRoute';
import LoginRoute from './routes/LoginRoute';
import MyGamesRoute from './routes/MyGamesRoute';
import CreateGameRoute from './routes/CreateGameRoute';
import HostRoute from './routes/HostRoute';
import GameDetailsRoute from './routes/GameDetailsRoute';
import FindGameRoute from './routes/FindGameRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginRoute />
          </Route>
          <Route path="/host/:gameId">
            <HostRoute />
          </Route>
          <Route path="/lobby/:gameId">
            <LobbyRoute />
          </Route>
          <Route path="/play/:gameId/as/:playerId">
            <PlayerRoute />
          </Route>
          <Route path="/join/:gameId">
            <JoinRoute />
          </Route>
          <Route path="/join">
            <FindGameRoute />
          </Route>
          <Route path="/games/create">
            <CreateGameRoute />
          </Route>
          <Route path="/games/:gameId">
            <GameDetailsRoute />
          </Route>
          <Route exact path="/games">
            <MyGamesRoute />
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
