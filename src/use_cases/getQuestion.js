import QuestionStore from "../store/QuestionStore";

const getQuestion = (questionId, scopes, questionStore = new QuestionStore()) => {
  return questionStore.get(questionId, scopes)
};

export default getQuestion;
