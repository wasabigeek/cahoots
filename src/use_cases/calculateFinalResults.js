import AnswerStore from '../store/AnswerStore';


/**
 * Saves an Answer.
 *
 * @param {Object} attributes
 * @returns Object - an "Answer"
 */
const calculateFinalResults = (gameId) => {
  const answerStore = new AnswerStore();

  return answerStore.list({ gameId })
    .then(answers => {
      return answers
        .filter(val => 'isCorrect' in val && !!val.isCorrect)
        .reduce((acc, curr) => {
          if (curr.playerName in acc) {
            acc[curr.playerName] += 1;
          } else {
            acc[curr.playerName] = 1;
          }
          return acc;
        }, {});
    })
};

export default calculateFinalResults;
