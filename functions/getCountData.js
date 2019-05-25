const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const cors = require('cors')({origin: true});
// admin.initializeApp(functions.config().firebase);

// const Firestore = require('@google-cloud/firestore');
// const firestore = new Firestore({
//   projectId: 'jumpwriter'
// });

// Get Count Data for a service or services based on parameters passed in
exports.handler = (args, context, firestore, functions) => {
  
  console.log('Count args',args)
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


    // Ensure user is allowed to view service data

    const allServices = getAllUsersServices(uid, firestore)   



    return piecesRef.get()
    .then((querySnapshot) => {
      let theData = []  
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().title, " => ", doc.data());
        theData.push(doc.data())
      });
      console.log('count theData is',theData)
      return(theData)
    })
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-data', 'No data was found.');
    })

  }
    
}

const getAllUsersServices = (uid, firestore) => {
  console.log('uid:',uid)

  // return firestore.collection('Users').get()
  //   .then((querySnapshot)=>{
  //     console.log('Users querySnapshot',querySnapshot)
  //     querySnapshot.forEach((doc)=>{
  //       let document = doc.data()
  //       console.log('User doc',document)
  //     })
  //     return null
  //   })
  //   .catch(()=>{
  //     throw new functions.https.HttpsError('invalid-data', 'No Users found');
  //   })


  const userRef = firestore.collection('Users').doc(uid)
  
  let allServices = []
  return userRef.get()
    .then((doc)=> {
      let userData = doc.data()
      console.log('userData',userData)
      Object.keys(userData.projects).map((projectName)=>{
        let project = userData.projects[projectName]
        console.log('project',project)
        if (project.services) {
          Object.keys(project.services).map((serviceName)=>{
            allServices.push(serviceName)
            return null    
          })
        }
      })
      console.log('allServices=',allServices)
      return(allServices)
    })
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-data', 'No projects were found under user.');
    })
}