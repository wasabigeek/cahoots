import GameStore from '../store/GameStore';
import QuestionStore from '../store/QuestionStore';

const showCurrentQuestion = (gameId, gameStore = new GameStore(), questionStore = new QuestionStore()) => {
  gameStore.update(gameId, { state: 'showingQuestion' });
  return gameStore
    .get(gameId)
    .then(game => {
      return questionStore.get(game.currentQuestion)
    });
}

export default showCurrentQuestion;
