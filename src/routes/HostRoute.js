import React from 'react';
import { useParams } from "react-router-dom";
import Game from '../utils/Game';

const onStart = (gameId) => {
  const game = new Game({ gameId })
  game.startNextQuestion()
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
