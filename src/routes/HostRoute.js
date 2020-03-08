import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'


const startNextQuestion = game => {
  return game.startNextQuestion().then(game.getCurrentQuestion)
}

const HostRoute = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  useEffect(() => {
    game.getCurrentQuestion().then(question => setQuestion(question))
  }, [])

  return (
    <div>
      { question ? <Question data={question} /> : null }
      <button onClick={() => startNextQuestion(game).then(setQuestion) }>Next Question</button>
    </div>
  )
}

export default HostRoute
