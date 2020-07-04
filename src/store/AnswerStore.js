import BaseStore from './BaseStore';

class AnswerStore extends BaseStore {
  /**
   * Creates an Answer.
   *
   * @param {Object} attributes - `gameId` will be used to nest the subcollection
   *  and generate a fully qualified reference for `playerId` and `questionId`
   * @returns Object - an "Answer" object
   * @memberof AnswerStore
   */
  create(attributes) {
    const gameId = this._popAttr(attributes, 'gameId');
    const playerId = this._popAttr(attributes, 'playerId');
    const questionId = this._popAttr(attributes, 'questionId');

    const subcollection = this.firestore
      .collection('games')
      .doc(gameId)
      .collection('answers');

    return subcollection
      .add(Object.assign({
        player: this.firestore.doc(['/games', gameId, 'players', playerId].join('/')),
        question: this.firestore.doc(['/games', gameId, 'questions', questionId].join('/'))
      }, attributes))
      .then(answerRef => answerRef.get())
      .then(this._convertDocToAnswer)
  }

  list(scopes = {}) {
    let chain = this.firestore;

    if ('gameId' in scopes) {
      chain = chain.collection('games').doc(scopes.gameId);
    }
    chain = chain.collection('answers');

    if ('questionId' in scopes) {
      // FIXME: ideally this would be independent of the gameId
      chain = chain.where("question", "==", this.firestore.doc(`games/${scopes.gameId}/questions/${scopes.questionId}`));
    }

    if ('limit' in scopes) {
      chain = chain.limit(scopes.limit);
    }

    return chain
      .get()
      .then(snapshot => snapshot.docs.map((a) => this._convertDocToAnswer(a)))
  }

  _convertDocToAnswer(answerDoc) {
    return Object.assign({ id: answerDoc.id }, answerDoc.data());
  }

  _popAttr(obj, attr) {
    const val = obj[attr];
    delete obj[attr];
    return val;
  }
}

export default AnswerStore;
