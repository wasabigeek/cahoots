import createGame from "../createGame";

describe('createGame', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3102);
  });

  afterEach(() => {
    global.Math.random.mockRestore();
  })

  it('creates a game with a random game shortcode', () => {
    const createFn = jest.fn();
    const gameStore = { create: createFn };

    const attributes = { title: 'test' };
    createGame(attributes, gameStore);
    expect(createFn).toHaveBeenCalledWith(Object.assign({ shortCode: "3101" }, attributes));
   })
});
