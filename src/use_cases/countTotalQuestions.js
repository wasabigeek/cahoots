import QuestionStore from '../store/QuestionStore';

const countTotalQuestions = (gameId) => {
  const questionStore = new QuestionStore();
  return questionStore
    .list({ gameId })
    .then(questions => questions.length);
}

export default countTotalQuestions;
