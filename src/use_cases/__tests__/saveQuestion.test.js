import saveQuestion from '../saveQuestion';

describe('when id is not included', () => {
  it('creates the question via the QuestionStore', () => {
    const createFn = jest.fn()
    const questionStore = { create: createFn };
    saveQuestion({ title: 'test' }, questionStore);
    expect(createFn).toHaveBeenCalledWith({ title: 'test'});
  });
});

describe('when id is included', () => {
  it('creates the question via the QuestionStore', () => {
    const updateFn = jest.fn()
    const questionStore = { update: updateFn };
    saveQuestion({ id: 'abc123', title: 'test' }, questionStore);
    expect(updateFn).toHaveBeenCalledWith('abc123', { title: 'test'});
  });
});
