import GameStore from '../store/GameStore';
import Game from '../entities/Game';


const findGamesByShortCode = (shortCode) => {
  return new GameStore().list({ shortCode: String(shortCode), state: Game.STATE_WAITING_FOR_PLAYERS });
};

export default findGamesByShortCode;
