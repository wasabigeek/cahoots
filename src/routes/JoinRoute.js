import React, { useState } from 'react'
import { useParams, Redirect } from "react-router-dom"
import { Button, Container, FormGroup, Label, Input } from 'reactstrap';

import Game from '../utils/Game'


const JoinForm = ({ playerName, setPlayerName, joinGame }) => {
  return (
    <div>
      <FormGroup>
        <Label>Name:</Label>
        <Input
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" onClick={joinGame}>JOIN</Button>
    </div>
  )
}

const PlayRoute = props => {
  let { gameId } = useParams()
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')
  const game = new Game({ gameId })

  return (
    <Container style={{maxWidth: "500px"}}>
      {playerId ?
          <Redirect
            to={`/games/${gameId}/players/${playerId}`}
          />
        : <JoinForm
          playerName={playerName}
          setPlayerName={setPlayerName}
          joinGame={() => {
            game
            .addPlayer(playerName)
            .then(setPlayerId)
          }}
        />
      }
    </Container>
  )
}

export default PlayRoute
