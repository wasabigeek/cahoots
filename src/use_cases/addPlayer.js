import PlayerStore from '../store/PlayerStore';


const addPlayer = (attributes) => {
  return new PlayerStore().create(attributes);
};

export default addPlayer;
