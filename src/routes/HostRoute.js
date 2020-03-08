import React from 'react';
import { useParams } from "react-router-dom";

const onStart = (gameId) => {
  console.log(gameId)
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
