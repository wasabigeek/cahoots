import GameStore from '../store/GameStore';


const getGame = (gameId, onChange) => {
  return new GameStore().get(gameId, onChange);
};

export default getGame;
