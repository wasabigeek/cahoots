import React from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC1QPvHcz3Y7gAsUUNN6sTy9sEgvtE9tRA",
  authDomain: "cahoots-37a93.firebaseapp.com",
  databaseURL: "https://cahoots-37a93.firebaseio.com",
  projectId: "cahoots-37a93",
  storageBucket: "cahoots-37a93.appspot.com",
  messagingSenderId: "295846162316",
  appId: "1:295846162316:web:cb3283790c16ffa536b0a9",
  measurementId: "G-L8SFBD43DB"
};
firebase.initializeApp(firebaseConfig);

const StoreContext = React.createContext(firebase.firestore());
export const StoreProvider = StoreContext.Provider
export default StoreContext
