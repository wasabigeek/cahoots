import React from 'react'

const GameContext = React.createContext({
  gameObj: null,
  updateGame: game => gameObj
});

export default GameContext
