import GameStore from '../store/GameStore';


const createGame = (attributes, gameStore = new GameStore()) => {
  // generate a random shortcode
  const shortCode = String(Math.floor(Math.random() * Math.floor(9999)));
  return gameStore.create(Object.assign({ shortCode }, attributes));
};

export default createGame;
