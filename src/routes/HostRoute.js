import React from 'react';
import { useParams } from "react-router-dom";
import GameDatabase from '../utils/GameDatabase';

const onStart = (gameId) => {
  const database = new GameDatabase({ gameId })
  database.startNextQuestion()
}

const HostRoute = props => {
  let { gameId } = useParams()

  return (
    <div>
      <button onClick={() => onStart(gameId)}>Start Game</button>
    </div>
  )
}

export default HostRoute
