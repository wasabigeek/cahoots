import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import Game from '../utils/Game'
import { TimeCounter } from '../utils/TimeCounter'


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
  const [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  return (
    <Container style={{maxWidth: "500px"}}>
      {
        playerId ?
          <div>
            {question ? <TimeCounter till={new Date(question.get('Finished At'))} /> : null }
            <Row className="mb-4">
              <Col sm={12}>
                <h2>Choose your answer:</h2>
              </Col>
            </Row>
            <Row>
              {
                ['A', 'B', 'C', 'D'].map((ans) =>
                  <Col sm={12} md={6} className="mb-4">
                    <Button
                      className="w-100 h-100"
                      onClick={() => game.addAnswer(playerId, ans).then(({ question }) => setQuestion(question))}>
                        <strong>
                          {ans}
                        </strong>
                    </Button>
                  </Col>
                )
              }
            </Row>
          </div>
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
