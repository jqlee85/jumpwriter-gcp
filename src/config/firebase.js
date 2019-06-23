import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

// const firebaseConfig = {
//   apiKey: "AIzaSyDmo7ifET5tw5oP00wwUnv3OfXrK3gNQ90",
//   authDomain: "jumpwriter.firebaseapp.com",
//   databaseURL: "https://jumpwriter.firebaseio.com",
//   projectId: "jumpwriter",
//   storageBucket: "jumpwriter.appspot.com",
//   messagingSenderId: "335067511694"
// }

const firebaseConfig = {
  apiKey: "AIzaSyDklB38sJfNadhBf7HJJlqTDlbATPHaEsQ",
  authDomain: "jumpwriter.firebaseapp.com",
  databaseURL: "https://jumpwriter.firebaseio.com",
  projectId: "jumpwriter",
  storageBucket: "jumpwriter.appspot.com",
  messagingSenderId: "335067511694",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const functions = firebase.functions()

export default firebaseApp