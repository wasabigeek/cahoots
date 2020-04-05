import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Button, Container, Row, Col, Alert } from 'reactstrap';

import Game from '../utils/Game'
import { TimeCounter } from '../utils/TimeCounter'


const AnswerGrid = ({ recordAnswer }) => {
  return (
    <Row>
      {
        ['A', 'B', 'C', 'D'].map((ans) =>
          <Col sm={12} md={6} className="mb-4" key={ans}>
            <Button
              className="w-100 h-100"
              onClick={() => recordAnswer(ans)}>
                <strong>{ans}</strong>
            </Button>
          </Col>
        )
      }
    </Row>
  )
}

const PlayerRoute = props => {
  let { gameId, playerId } = useParams()
  const [playerName, setPlayerName] = useState('')
  const [question, setQuestion] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const game = new Game({ gameId })

  useEffect(() => {
    game.getPlayer(playerId)
      .then(player => setPlayerName(player.get('Name')))
  }, [])

  const recordAnswer = ans => {
    game
      .addAnswer(playerId, ans)
      .then(({ question }) => {
        setQuestion(question)
        setErrorMessage('')
      })
      .catch(e => {
        setErrorMessage(e)
        setTimeout(() => setErrorMessage(''), 5000)
      })
  }

  return (
    <Container style={{maxWidth: "500px"}}>
      <Row className="mb-4">
        <Col sm={12}>
          <h2>Hi {playerName}!</h2>
          <h3>Choose your answer:</h3>
        </Col>
      </Row>
      <AnswerGrid recordAnswer={recordAnswer}/>
      {question ? <TimeCounter till={new Date(question.get('Finished At'))} /> : null }
      {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}
    </Container>
  )
}

export default PlayerRoute
