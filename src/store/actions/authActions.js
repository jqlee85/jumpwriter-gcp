export const signIn = (credentials, signInMethod=null) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    
    switch(signInMethod) {
      case 'google':
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        console.log('GOOGLE LOGIN')
        firebase.auth().signInWithPopup(googleProvider)
        .then((result)=>{
          dispatch({ type: 'LOGIN_SUCCESS' });
        })
        .catch((error)=>{
          dispatch({ type: 'LOGIN_ERROR', error});
        })
        return null
      default:
        console.log('EMAIL LOGIN')
        firebase.auth().signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        ).then(()=>{
          dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((error)=>{
          dispatch({type: 'LOGIN_ERROR', error})
        })
        return null
    }

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser, signUpMethod=null) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    
    console.log('newUser',newUser)
    console.log('signUpMethod',signUpMethod)

    switch(signUpMethod) {
      case 'google':
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        console.log('GOOGLE SIGNUP')
        firebase.auth().signInWithPopup(googleProvider)
        .then(function(result) {
          dispatch({ type: 'SIGNUP_SUCCESS' })
        })
        .catch(function(error) {
          dispatch({ type: 'SIGNUP_ERROR', error})
        })
        return null
      case 'facebook':
        const facebookProvider = new firebase.auth.FacebookAuthProvider()
        console.log('FACEBOOK SIGNUP')
        firebase.auth().signInWithPopup(facebookProvider)
        .then(function(result) {
          dispatch({ type: 'SIGNUP_SUCCESS' })
        })
        .catch(function(error) {
          dispatch({ type: 'SIGNUP_ERROR', error})
        })
        return null
      default:
        console.log('EMAIL SIGNUP')
        firebase.auth().createUserWithEmailAndPassword(
          newUser.email, 
          newUser.password
        ).then(resp => {
          return firestore.collection('Users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
        }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((error) => {
          dispatch({ type: 'SIGNUP_ERROR', error})
        })
        return null
    }
    
  }
}