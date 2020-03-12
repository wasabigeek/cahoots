import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'


const PlayRoute = props => {
  let { gameId } = useParams()
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const game = new Game({ gameId })
    game.getCurrentQuestion().then(data => setQuestion(data))
  }, []);

  if (question) {
    return <Question data={question} />
  }
  else {
    return <div>No more questions!</div>
  }
}

export default PlayRoute
