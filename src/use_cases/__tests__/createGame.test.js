import createGame from "../createGame";

describe('createGame', () => {
  it('creates via the gameStore', () => {
    const createFn = jest.fn();
    const gameStore = { create: createFn };

    const attributes = { title: 'test' };
    createGame(attributes, gameStore);
    expect(createFn).toHaveBeenCalledWith(attributes);
  });
});
