
import findGamesByShortCode from "../findGamesByShortCode";
import GameStore from "../../store/GameStore";
import Game from "../../entities/Game";
jest.mock('../../store/GameStore');

beforeEach(() => {
  GameStore.mockClear();
});

describe('findGamesByShortCode', () => {
  it('coerces shortCode to string', () => {
    findGamesByShortCode(1);

    const mockGameStore = GameStore.mock.instances[0];
    expect(mockGameStore.list).toHaveBeenCalledWith({
      shortCode: "1",
      state: Game.STATE_WAITING_FOR_PLAYERS
    });
  });

  it('retrieves games', () => {
    findGamesByShortCode("1");

    const mockGameStore = GameStore.mock.instances[0];
    expect(mockGameStore.list).toHaveBeenCalledWith({
      shortCode: "1",
      state: Game.STATE_WAITING_FOR_PLAYERS
    });
   });
});
