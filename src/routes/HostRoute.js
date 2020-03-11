import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'


const HostRoute = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  useEffect(() => {
    game.getCurrentQuestion().then(setQuestion)
  }, [])

  return (
    <div>
      { question ? <Question data={question} /> : null }
      <button onClick={() => game.startNextQuestion().then(() => game.getCurrentQuestion().then(setQuestion)) }>Next Question</button>
    </div>
  )
}

export default HostRoute
