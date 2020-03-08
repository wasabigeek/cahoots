import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'


const HostRoute = props => {
  let { gameId } = useParams()
  const [questions, setQuestions] = useState([])
  const game = new Game({ gameId })

  useEffect(() => {
    game.getAllQuestions().then(setQuestions)
  }, [])
  console.log(questions)
  return (
    <div>
      { questions.map(q => <Question data={q} />) }
      <button onClick={() => game.startNextQuestion().then(game.getAllQuestions).then(setQuestions) }>Next Question</button>
    </div>
  )
}

export default HostRoute
