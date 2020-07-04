import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Button, Row, Col, Alert } from 'reactstrap';

import getPlayer from '../use_cases/getPlayer';
import addAnswer from '../use_cases/addAnswer';
import getGame from '../use_cases/getGame';
import CenteredContainer from '../view_components/CenteredContainer';


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

const PlayerRoute = () => {
  let { gameId, playerId } = useParams()
  const [currentGame, setCurrentGame] = useState();
  const [playerName, setPlayerName] = useState('')
  const [answer, setAnswer] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleGameChange = (game) => {
    if (game) {
      // workaround to clear answer
      setAnswer(null);
      setCurrentGame(game);
    }
  }

  useEffect(() => {
    if (gameId && playerId) {
      getGame(gameId, handleGameChange);
      getPlayer(playerId, { gameId })
        .then(player => setPlayerName(player.name))
    }
  }, [gameId, playerId])

  const recordAnswer = ans => {
    // playerName is for convenience later, though it feels a little like this knows more about the store than it should
    addAnswer({ playerId, playerName, gameId, choice: ans })
      .then(setAnswer)
      .catch(e => {
        setErrorMessage(e)
        setTimeout(() => setErrorMessage(''), 5000)
      })
  }

  switch (currentGame ? currentGame.state : null) {
    case 'pendingQuestion':
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          Next question coming up...
        </CenteredContainer>
      )
    case 'showingQuestion':
      if (answer) {
        return (
          <CenteredContainer maxWidth={500} verticalCentered={true}>
            You chose {answer.choice}!
          </CenteredContainer>
        )
      }

      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          <Row className="mb-4">
            <Col sm={12}>
              <h2>Hi {playerName}!</h2>
              <h3>Choose your answer:</h3>
            </Col>
          </Row>
          <AnswerGrid recordAnswer={recordAnswer}/>
          {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}
        </CenteredContainer>
      );
    case 'showingQuestionResults':
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          <div>Showing question results...</div>
        </CenteredContainer>
      );

    default:
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          Waiting for game to start...
        </CenteredContainer>
      )
  }
}

export default PlayerRoute
