const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: 'jumpwriter'
});

exports.getPrompt = functions.https.onCall((data, context) => {
  
  console.log('data',data)
  console.log('context.auth',context.auth)

  const authenticated = context.auth
  const uid = authenticated ? context.auth.uid : false

  switch(data.promptType) {

    case 'text':
      return Promise.resolve(
        'this should be prompt text'
      ).then((response)=>{
        return {
          data: response,
          status: 'loaded'
        }
      }).catch((error)=>{
        throw new functions.https.HttpsError('unknown', 'Error getting text prompt')
      })
    case 'random image':
      return Promise.resolve(
        'this should be an image prompt'
      ).then((response)=>{
        return {
          data: response,
          status: 'loaded'
        }
      }).catch((error)=>{
        throw new functions.https.HttpsError('unknown', 'Error getting image prompt')
      })
    default:
      return new Promise.resolve(
      ).then((response)=>{
        throw new functions.https.HttpsError('unknown', 'No prompt type specified')
      }).catch((error)=>{
        throw new functions.https.HttpsError('unknown', 'No prompt type specified')
      })

  }

    // const db = admin.firestore()
    // const piecesRef = firestore.collection('Pieces').where('uid', '==', uid)
    // // .where("capital", "==", true)

    // return piecesRef.get()
    // .then((querySnapshot) => {
    //   let theData = []  
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.data().title, " => ", doc.data());
    //     console.log('DOC',doc)
    //     theData.push({id: doc.id,data:doc.data()})
    //   });
    //   console.log('theData is',theData)
    //   return(theData)
    // })
    // .catch((error) => {
    //   throw new functions.https.HttpsError('invalid-data', 'No data was found.');
    // })

  
    
})