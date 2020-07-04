import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from "react-router-dom"
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

import addPlayer from '../use_cases/addPlayer';
import CenteredContainer from '../view_components/CenteredContainer';
import getGame from '../use_cases/getGame';


const JoinForm = ({ playerName, setPlayerName, joinGame }) => {
  return (
    <Form onSubmit={e => {
      e.preventDefault();
      joinGame();
    }}>
      <FormGroup>
        <Label>Your Nickname:</Label>
        <Input
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" type="submit">JOIN</Button>
    </Form>
  )
}

const JoinRoute = () => {
  let { gameId } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (gameId && game === null) {
      getGame(gameId).then(setGame);
    }
  }, [gameId, game])

  return (
    <CenteredContainer maxWidth={500} verticalCentered>
      <h1>{game ? game.name : null}</h1>
      {playerId ?
          <Redirect
            to={`/play/${gameId}/as/${playerId}`}
          />
        : <JoinForm
          playerName={playerName}
          setPlayerName={setPlayerName}
          joinGame={() => addPlayer({ name: playerName, gameId }).then(p => setPlayerId(p.id))}
        />
      }
    </CenteredContainer>
  )
}

export default JoinRoute
