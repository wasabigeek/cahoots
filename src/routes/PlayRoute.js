import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import Game from '../utils/Game'
import Question from '../utils/Question'
import TimeCounter from '../utils/TimeCounter'


const JoinForm = ({ playerName, setPlayerName, joinGame }) => {
  return (
    <div>
      <div>
        <label>
          Name: <input value={playerName} onChange={e => setPlayerName(e.target.value)} />
        </label>
      </div>
      <button onClick={joinGame}>JOIN</button>
    </div>
  )
}


const PlayRoute = props => {
  let { gameId } = useParams()
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')
  const [question, setQuestion] = useState(null)
  const game = new Game({ gameId })

  if (playerId) {
    return <div>
      {question ? <TimeCounter till={new Date(question.get('Finished At'))} /> : null }
      <button onClick={() => game.addAnswer(playerId, 'A').then(({ question }) => setQuestion(question))}>A</button>
      <button onClick={() => game.addAnswer(playerId, 'B')}>B</button>
      <button onClick={() => game.addAnswer(playerId, 'C')}>C</button>
      <button onClick={() => game.addAnswer(playerId, 'D')}>D</button>
    </div>
  }
  else {
    return <JoinForm
      playerName={playerName}
      setPlayerName={setPlayerName}
      joinGame={() => {
        game
        .addPlayer(playerName)
        .then(setPlayerId)
      }}
    />
  }
}

export default PlayRoute
