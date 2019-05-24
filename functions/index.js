const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: 'jumpwriter'
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.getPieces = functions.https.onCall((data, context) => {
  
  console.log('data',data)
  console.log('context.auth',context.auth)

  // Message text passed from the client.
  // Authentication / user information is automatically added to the request.
  if ( !context.auth ) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  } else {

    const uid = context.auth.uid
    // const name = context.auth.token.name || null
    // const email = context.auth.token.email || null  

    // const db = admin.firestore()
    const piecesRef = firestore.collection('Pieces').where('owner', '==', uid)
    // .where("capital", "==", true)

    return piecesRef.get()
    .then((querySnapshot) => {
      let theData = []  
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().title, " => ", doc.data());
        theData.push(doc.data())
      });
      console.log('theData is',theData)
      return(theData)
    })
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-data', 'No data was found.');
    })

  }
    
})