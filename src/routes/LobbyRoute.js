import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import getLobbyPlayers from '../use_cases/getLobbyPlayers';
import getGame from '../use_cases/getGame';
import CenteredContainer from '../view_components/CenteredContainer';


const PlayerList = ({ players }) => {
  return (
    <ListGroup>
      {
        players.map(player => (
          <ListGroupItem key={player.id}>{player.name}</ListGroupItem>
        ))
      }
    </ListGroup>
  );
}


const LobbyRoute = props => {
  let { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState(null);
  const joinUrl = `${window.location.origin}/cahoots/`;

  useEffect(() => {
    if (gameId) {
      getLobbyPlayers(gameId, setPlayers);
      getGame(gameId).then(setGame);
    }
  }, [gameId])

  return (
    <CenteredContainer verticalCentered={true} maxWidth={800}>
      <h1 className="mb-4">Waiting for Players to join...</h1>
      <p>
        To join, go to <a href={joinUrl} rel="noopener noreferrer" target="_blank">{joinUrl}</a> and enter the game code <strong>{game ? game.shortCode : "___"}</strong>
      </p>
      <PlayerList players={players} />
      <div className="mt-4">
        <Link to={`/host/${gameId}/questions/pending`}>
          <Button color="primary">Start</Button>
        </Link>
      </div>
    </CenteredContainer>
  )
}

export default LobbyRoute
