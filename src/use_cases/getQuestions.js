import QuestionStore from "../store/QuestionStore";

const getQuestions = (scopes) => {
  const questionStore = new QuestionStore();
  return questionStore.list(scopes)
};

export default getQuestions;
