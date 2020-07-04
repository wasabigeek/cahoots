import PlayerStore from '../store/PlayerStore';
import GameStore from '../store/GameStore';


const getLobbyPlayers = (gameId, onChange, playerStore = new PlayerStore(), gameStore = new GameStore()) => {
  gameStore.update(gameId, { state: 'waitingForPlayers' });
  return playerStore.list({ gameId }, onChange);
};

export default getLobbyPlayers;
