import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import prompt from "./reducers/promptReducer";
import app from "./reducers/appReducer";
import user from "./reducers/userReducer";
import auth from "./reducers/authReducer";
import {fireStoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const env = process.env.NODE_ENV || 'development';
const middleware = [thunk];
const logger = createLogger();
if (env === 'development') middleware.push(logger);


const configureStore = preloadedState =>
  createStore(
    combineReducers({
      auth,
      user,
      prompt,
      app,
      fireStoreReducer,
      firebaseReducer
    }), 
    preloadedState, 
    applyMiddleware(...middleware)
  );

export default configureStore;
