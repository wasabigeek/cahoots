import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Container, Card, CardBody, Row, Col, CardTitle, CardText } from 'reactstrap';

import Game from '../utils/Game'


const ResultBoard = ({ result, className }) => {
  return (
    <div className={className}>
      <Row>
        {
          Object.entries(result).map(([answer, players]) => (
            <Col sm={12} md={6} className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle><strong>{answer}</strong></CardTitle>
                  <CardText>
                    {players.join(', ')}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

async function calculateResult(game, questionId) {
  let answers = await game.getAnswers(questionId)
  let players = await game.getPlayers()

  // group by answers
  let results = { 'A': [], 'B': [], 'C': [], 'D': []}
  answers.forEach(answer => {
    let value = answer.get('Answer')

    const playerId = answer.get('Player')[0]
    const player = players.find(player => playerId === player.getId())

    results[value] = results[value].concat(player.get('Name'))
  })

  return results
}

const QuestionResultsRoute = props => {
  let { gameId, questionId } = useParams()
  let [result, setResult] = useState({})
  const game = new Game({ gameId })

  useEffect(() => {
    calculateResult(game, questionId).then(setResult)
  }, [])

  return (
    <Container>
      <ResultBoard className="mb-4" result={result} />
      <Link to={`/games/${encodeURI(gameId)}/questions/current`}>
        <Button color="primary">
          Next Question
        </Button>
      </Link>
    </Container>
  )
}

export default QuestionResultsRoute

// no result, no question, start button
// no result, question, no buttons if time out, else show button if within time
// have result, show result, hide question, next button (clears result)
