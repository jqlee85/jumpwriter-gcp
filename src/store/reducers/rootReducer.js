import authReducer from './authReducer'
import appReducer from './appReducer'
import promptReducer from './promptReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  prompt: promptReducer,
  user: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  appReducer: appReducer,
  userReducer: userReducer
});

export default rootReducer

// the key name will be the data property on the state object