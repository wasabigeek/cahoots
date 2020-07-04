const firebase = require('firebase');

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1QPvHcz3Y7gAsUUNN6sTy9sEgvtE9tRA",
  authDomain: "cahoots-37a93.firebaseapp.com",
  databaseURL: "https://cahoots-37a93.firebaseio.com",
  projectId: "cahoots-37a93",
  storageBucket: "cahoots-37a93.appspot.com",
  messagingSenderId: "295846162316",
  appId: "1:295846162316:web:cb3283790c16ffa536b0a9",
  measurementId: "G-L8SFBD43DB"
};


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
