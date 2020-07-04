import GameStore from '../store/GameStore';
import AnswerStore from '../store/AnswerStore';
import QuestionStore from '../store/QuestionStore';


/**
 * Saves an Answer.
 *
 * @param {Object} attributes
 * @returns Object - an "Answer"
 */
const addAnswer = (attributes) => {
  const questionStore = new QuestionStore();

  return new GameStore()
    .get(attributes.gameId)
    .then(game => {
      return questionStore.get(game.currentQuestionId, { gameId: game.id });
    })
    .then(question => {
      attributes.isCorrect = question.correctAnswer === attributes.choice;
      attributes.questionId = question.id;
      console.log(attributes)
      return new AnswerStore().create(attributes);
    })
};

export default addAnswer;
