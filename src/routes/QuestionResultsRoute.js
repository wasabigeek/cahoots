import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Container, Card, CardBody, Row, Col, CardTitle, CardText } from 'reactstrap';

import Game from '../utils/Game'


const ResultBoard = ({ result, className, question }) => {
  return (
    <div className={className}>
      <h2 className="mb-4">{question ? question.text : null}</h2>
      <Row>
        {
          Object.entries(result).map(([answer, players]) => (
            <Col sm={12} md={6} className="mb-4">
              <Card
                color={question.correctAnswer == answer ? 'success' : null}
                inverse={question.correctAnswer == answer ? true : null}
              >
                <CardBody>
                  <CardTitle>
                    <strong className='mr-2'>{answer}</strong>
                    {question.correctAnswer == answer ? '✔️' : '❌'}
                  </CardTitle>
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
  let [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  useEffect(() => {
    game.getQuestion(questionId).then(setQuestion)
    calculateResult(game, questionId).then(setResult)
  }, [])

  return (
    <Container>
      <ResultBoard className="mb-4" result={result} question={question} />
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
