import GameStore from '../store/GameStore';
import QuestionStore from '../store/QuestionStore';

const startNextQuestion = (gameId) => {
  const gameStore = new GameStore();
  const questionStore = new QuestionStore();

  gameStore.update(gameId, { state: 'pendingQuestion' });
  return gameStore
    .get(gameId)
    .then(game => {
      if ('currentQuestion' in game) {
        return questionStore.get(game.currentQuestion);
      }
      else {
        return;
      }
    })
    .then(currentQuestion => {
      const nextOrder = currentQuestion ? currentQuestion.order : 0 ;
      return questionStore.list({ gameId, from: nextOrder, limit: 1 });
    })
    .then(questionArray => {
      const question = questionArray[0];
      if (question) {
        gameStore.update(gameId, { currentQuestionId: question.id });
      }

      return question;
    });
}

export default startNextQuestion;
