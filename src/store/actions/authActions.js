export const signIn = (credentials, signUpMethod=null) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    


    if (signUpMethod === 'google') {
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      console.log('GOOGLE SIGNUP')
      firebase.auth().signInWithPopup(googleProvider)
      .then(function(result) {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(function(error) {
        dispatch({ type: 'SIGNUP_ERROR', error});
      });
    } else {
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(()=>{
        dispatch({type: 'LOGIN_SUCCESS'})
      }).catch((error)=>{
        dispatch({type: 'LOGIN_ERROR', error})
      })
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
    const firebase = getFirebase();
    const firestore = getFirestore();
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    console.log('newUser',newUser)
    console.log('signUpMethod',signUpMethod)

    if (signUpMethod === 'google') {
      console.log('GOOGLE SIGNUP')
      firebase.auth().signInWithPopup(googleProvider)
      .then(function(result) {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(function(error) {
        dispatch({ type: 'SIGNUP_ERROR', error});
      });


    } else {
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
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((error) => {
        dispatch({ type: 'SIGNUP_ERROR', error});
      });
    }
    
  }
}