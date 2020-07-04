
import GameStore from "../store/GameStore";
import getCurrentUser from "./getCurrentUser";


const getCurrentUserGames = () => {
  const gameStore = new GameStore();

  return getCurrentUser().then(user => user ? gameStore.list({ ownerId: user.id }) : null);
}

export default getCurrentUserGames;
