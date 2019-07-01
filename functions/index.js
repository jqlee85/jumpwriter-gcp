const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
require('isomorphic-fetch')
const Unsplash = require('unsplash-js').default
const {toJson} = require('unsplash-js')
const helpers = require('./helpers')
const { getThreeWordPrompt, getNewAutoId} = helpers

admin.initializeApp(functions.config().firebase)
const Firestore = require('@google-cloud/firestore')
const firestore = new Firestore({ projectId: 'jumpwriter' })

exports.getPrompt = functions.https.onCall((data, context) => {
  
  const authenticated = context.auth
  const uid = authenticated ? context.auth.uid : false

  switch(data.promptType) {

    case 'text': {
      
      const nounDoc = firestore.collection('nouns').where('__name__', '>=', getNewAutoId()).limit(1).get()
      const verbDoc = firestore.collection('verbs').where('__name__', '>=', getNewAutoId()).limit(1).get()
      
      return Promise.all([verbDoc,nounDoc])
        .then((results)=>{
          let verb
          results[0].forEach((doc)=>{
            verb = doc.data().word
          })
          let noun
          results[1].forEach((doc)=>{
            noun = doc.data().word
          })
          return {
            promptType: 'random three word text',
            noun: noun,
            verb: verb,
            promptContent: getThreeWordPrompt(verb,noun)
          }
        }).catch(error=>{
          console.error(error)
          throw new functions.https.HttpsError('unknown', 'Error getting text prompt')
        })
    }
    
    case 'random image': {
      return firestore.collection('api_credentials').doc('unsplash').get()
        .then((doc,i)=>{
          const credentials = doc.data()
          const unsplash = new Unsplash({
            applicationId: credentials.application_id,
            secret: credentials.secret
          })
          return unsplash.photos.getRandomPhoto()
        })
        .then(toJson)
        .then((json)=>{
          return {
            promptType: 'random unsplash image',
            promptContent: json
          }
        })
        .catch((error)=>{
          console.error(error)
          throw new functions.https.HttpsError('unknown', 'Error getting image prompt from Unsplash')
        })
    }
   
    default: {
      return new Promise.resolve(
      ).then((response)=>{
        throw new functions.https.HttpsError('unknown', 'No prompt type specified')
      }).catch((error)=>{
        throw new functions.https.HttpsError('unknown', 'No prompt type specified')
      })
    }
  
  }
  
})

