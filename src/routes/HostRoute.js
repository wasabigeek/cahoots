import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'
import { TimeCounter, calculateTimeLeft } from '../utils/TimeCounter'


const ResultBoard = ({ result }) => {
  return (
    <div>
      {Object.entries(result).map(([answer, players]) => {
        return <div>{answer}: {players.length}</div>
      })}
    </div>
  )
}

const startNextQuestion = (game, setQuestion, setResult) => {
  game.startNextQuestion()
    .then(() => game.getCurrentQuestion().then(setQuestion))
    .then(() => setResult(null))
}

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
  const [result, setResult] = useState(null)
  const game = new Game({ gameId })

  useEffect(() => {
    game.getCurrentQuestion().then(setQuestion)
  }, [])

  return (
    <div>
      {
        result ?
          <div>
            <ResultBoard result={result} />
            <button onClick={() => startNextQuestion(game, setQuestion, setResult) }>
              Next Question
            </button>
          </div>
        : question ?
          <div>
            <Question data={question} />
            <TimeCounter till={new Date(question.get('Finished At'))} />
            <button onClick={() => calculateResult(game, question, setResult) }>
              Show Result
            </button>
          </div>
        :
          <button onClick={() => startNextQuestion(game, setQuestion, setResult) }>
            Start Game
          </button>
      }
    </div>
  )
}

export default HostRoute

// no result, no question, start button
// no result, question, no buttons if time out, else show button if within time
// have result, show result, hide question, next button (clears result)
