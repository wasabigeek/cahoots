import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Button, Container } from 'reactstrap';

import Game from '../utils/Game'


const ResultBoard = ({ result, className }) => {
  return (
    <div className={className}>
      {Object.entries(result).map(([answer, players]) => {
        return <div>{answer}: {players.length}</div>
      })}
    </div>
  )
}

async function calculateResult(game, questionId) {
  let answers = await game.getAnswers(questionId)
  // group by answers
  return answers.reduce((acc, answer) => {
    let value = answer.get('Answer')
    if (acc[value] == null) {
      acc[value] = []
    }
    acc[value] = acc[value].concat(answer.get('Player'))

    return acc
  }, {})
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
      <Button color="primary">
        Next Question
      </Button>
    </Container>
  )
}

export default QuestionResultsRoute

// no result, no question, start button
// no result, question, no buttons if time out, else show button if within time
// have result, show result, hide question, next button (clears result)
