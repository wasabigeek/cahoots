import QuestionStore from "../store/QuestionStore";
import { popKey } from '../utils/popKey';

/**
 * Creates a new Question or saves an existing one.
 *
 * @param {Object} attributes - should minimally contain `gameId`. If no `id` is included, is assumed to be a new Question
 * @returns Promise - resolves to either Object or void
 */
const saveQuestion = (attributes, questionStore = new QuestionStore()) => {
  let attributesCopy = Object.assign({}, attributes);

  if ('id' in attributesCopy) {
    const questionId = popKey(attributesCopy, 'id');
    return questionStore.update(questionId, attributesCopy);
  } else {
    return questionStore.create(attributesCopy);
  }
};

export default saveQuestion;
