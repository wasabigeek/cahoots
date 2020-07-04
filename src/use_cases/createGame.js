import GameStore from '../store/GameStore';


const createGame = (attributes) => {
  return new GameStore().create(attributes);
};

export default createGame;
