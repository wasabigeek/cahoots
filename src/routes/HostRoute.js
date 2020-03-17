import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'
import { TimeCounter, calculateTimeLeft } from '../utils/TimeCounter'


async function calculateResult(game, question, setResult) {
  let answers = await game.getAnswers(question.getId())
  // group by answers
  let result = answers.reduce((acc, answer) => {
    let value = answer.get('Answer')
    if (acc[value] == null) {
      acc[value] = []
    }
    acc[value] = acc[value].concat(answer.get('Player'))

    return acc
  }, {})

  setResult(result)
}

const HostRoute = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null)
  const [result, setResult] = useState({})
  const game = new Game({ gameId })

  useEffect(() => {
    game.getCurrentQuestion().then(setQuestion)
  }, [])

  return (
    <div>
      { question ?
        <div>
          <Question data={question} />
          <TimeCounter till={new Date(question.get('Finished At'))} />
          <button onClick={() => calculateResult(game, question, setResult) }>Show Result</button>
        </div>
        : null
      }
      <button onClick={() => game.startNextQuestion().then(() => game.getCurrentQuestion().then(setQuestion)) }>Next Question</button>
      { result ?
        <div>{JSON.stringify(result)}</div>
        : null
      }
    </div>
  )
}

export default HostRoute
