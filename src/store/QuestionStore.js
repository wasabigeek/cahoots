import BaseStore from './BaseStore';
import { popKey } from '../utils/popKey';

class QuestionStore extends BaseStore {
  /**
   * Retrieves a Question from the store
   *
   * @param {string} questionId - if a scope is not provided, this must be a
   *   fully qualified ref, as there is no top-level questions collection.
   * @param {Object} [scopes={}]
   * @returns Object
   * @memberof QuestionStore
   */
  get(questionId, scopes = {}) {
    let chain = this.firestore;
    let addAttrs = {};

    if ('gameId' in scopes) {
      chain = chain.collection('games').doc(scopes.gameId).collection('questions');
      addAttrs['gameId'] = scopes.gameId;
    }

    return chain
      .doc(questionId)
      .get()
      .then(questionDoc => this._convertDocToQuestion(questionDoc, addAttrs));
  }

  create(attributes) {
    let attributesCopy = Object.assign({}, attributes);
    const gameId = popKey(attributesCopy, 'gameId');

    let collection = this.firestore.collection('games').doc(gameId).collection('questions');

    return collection
      .add(attributesCopy)
      .then(qnRef => qnRef.get())
      .then(qnDoc => this._convertDocToQuestion(qnDoc, { gameId }));
  }

  /**
   * Update an object
   *
   * @param {String} questionId
   * @param {Object} attributes
   * @returns Promise<void>
   * @memberof QuestionStore
   */
  update(questionId, attributes) {
    let attributesCopy = Object.assign({}, attributes);
    const gameId = popKey(attributesCopy, 'gameId');

    let doc = this.firestore.collection('games').doc(gameId).collection('questions').doc(questionId);

    return doc.update(attributesCopy);
  }

  list(scopes = {}) {
    let chain = this.firestore;
    let addAttrs = {};

    if ('gameId' in scopes) {
      chain = chain.collection('games').doc(scopes.gameId).collection('questions');
      addAttrs['gameId'] = scopes.gameId;
    }
    if ('from' in scopes) {
      chain = chain.where("order", ">", scopes.from);
    }

    chain = chain.orderBy("order");

    if ('limit' in scopes) {
      chain = chain.limit(scopes.limit);
    }

    return chain
      .get()
      .then(snapshot => snapshot.docs.map((q) => this._convertDocToQuestion(q, addAttrs)));
  }

  _convertDocToQuestion(questionDoc, addAttributes = {}) {
    return Object.assign({ id: questionDoc.id }, questionDoc.data(), addAttributes);
  }
}

export default QuestionStore;
