import PlayerStore from '../store/PlayerStore';


const getPlayer = (playerId, scopes = {}) => {
  return new PlayerStore().get(playerId, scopes);
};

export default getPlayer;
