import BaseStore from './BaseStore';
import Game from '../entities/Game';


class GameStore extends BaseStore {
  create(attributes = {}) {
    return this.firestore
      .collection('games')
      .add(Object.assign({ state: Game.STATE_DRAFT }, attributes))
      .then(ref => ref.get())
      .then(this._convertDocToGame)
  }

  /**
   *
   *
   * @param {String} gameId
   * @param {Function} onChange - if provided, will trigger when Game is updated
   * @returns
   * @memberof GameStore
   */
  get(gameId, onChange) {
    const doc = this._getGameDoc(gameId)

    if (onChange !== undefined) {
      return doc.onSnapshot(gameDoc => onChange(this._convertDocToGame(gameDoc)));
    }

    return doc.get().then(this._convertDocToGame);
  }

  list(scopes = {}) {
    let chain = this.firestore.collection('games');

    if ('ownerId' in scopes) {
      // FIXME: ideally this would be independent of the gameId
      chain = chain.where("ownerId", "==", scopes.ownerId);
    }

    if ('state' in scopes) {
      chain = chain.where("state", "==", scopes.state);
    }

    if ('shortCode' in scopes) {
      chain = chain.where("shortCode", "==", scopes.shortCode);
    }

    if ('limit' in scopes) {
      chain = chain.limit(scopes.limit);
    }

    return chain
      .get()
      .then(snapshot => snapshot.docs.map((a) => this._convertDocToGame(a)))
  }

  update(gameId, attributes) {
    const doc = this._getGameDoc(gameId);

    if ('currentQuestionId' in attributes) {
      attributes.currentQuestion = doc.collection('questions').doc(attributes.currentQuestionId);
      delete attributes.currentQuestionId;
    }

    return doc.update(attributes);
  }

  _getGameDoc(gameId) {
    return this.firestore
      .collection('games')
      .doc(gameId);
  }

  _convertDocToGame(gameDoc) {
    let game = Object.assign({ id: gameDoc.id }, gameDoc.data());
    if ('currentQuestion' in game) {
      game.currentQuestionId = game.currentQuestion.id;
      game.currentQuestion = game.currentQuestion.path;  // TODO: remove this
    }
    return game;
  }
}

export default GameStore;
