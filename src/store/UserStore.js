import BaseStore from './BaseStore';

class UserStore extends BaseStore {
  create(attributes = {}) {
    const { email, password } = attributes;

    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const firebaseUser = userCredentials.user;
        return this._convertUser(firebaseUser);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // auth/email-already-in-use
        // auth/invalid-email
        // auth/operation-not-allowed
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  }

  login({ email, password }) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const firebaseUser = userCredentials.user;
        return this._convertUser(firebaseUser);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // auth/email-already-in-use
        // auth/invalid-email
        // auth/operation-not-allowed
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  }

  onCurrentUserChange(handleChange) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        handleChange(this._convertUser(user));
      }
    })
  }

  _convertUser(firebaseUser) {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
    };
  }
}

export default UserStore;
