import BaseStore from './BaseStore';

class PlayerStore extends BaseStore {
  get(playerId, scopes = {}) {
    return this.firestore
      .collection('games')
      .doc(scopes.gameId)
      .collection('players')
      .doc(playerId)
      .get()
      .then(this._convertDocToPlayer)
  }

  create(attributes = {}) {
    let chain = this.firestore;
    if ('gameId' in attributes) {
      const gameId = attributes.gameId;
      delete attributes.gameId;

      chain = chain.collection('games').doc(gameId).collection('players');
    }

    return chain
      .add(attributes)
      .then(playerRef => playerRef.get())
      .then(this._convertDocToPlayer)
  }

  list(scopes = {}, onChange) {
    let chain = this.firestore;
    if ('gameId' in scopes) {
      chain = chain.collection('games').doc(scopes.gameId);
    }
    chain = chain.collection('players');

    if ('limit' in scopes) {
      chain = chain.limit(scopes.limit);
    }

    if (onChange !== undefined) {
      return chain.onSnapshot(playersSnapshot => {
        let players = [];
        playersSnapshot.forEach(playerDoc => players.push(this._convertDocToPlayer(playerDoc)));
        onChange(players);
      });
    }

    return chain
      .get()
      .then(snapshot => snapshot.docs.map((p) => this._convertDocToQuestion(p)))
  }

  _convertDocToPlayer(playerDoc) {
    return Object.assign({ id: playerDoc.id }, playerDoc.data());
  }
}

export default PlayerStore;
