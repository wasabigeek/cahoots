const firebase = require('firebase');

const FIREBASE_CONFIG = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);


class BaseStore {
  constructor(props) {
    // workaround to prevent initializing multiple times
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
      // firebase.firestore.setLogLevel('debug');
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();
  }
}

export default BaseStore;
