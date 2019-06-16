
export const saveWriting = (writing, pieceID=null, prompt=null) => {
  
  return (dispatch, getState, {getFirestore}) => {
    // const firebase = getFirebase();
    const firestore = getFirestore()
    const authorId = getState().firebase.auth.uid;
    
    console.log('action called')
    console.log('writing:',writing)
    console.log('pieceID:',pieceID)

    if (pieceID){
      console.log('PIECE ID EXISTS...',pieceID)
      firestore.collection('Pieces').doc(pieceID).update({
        content: writing,
        updatedAt: new Date(),
      }).then((response)=>{
        console.log(response)
        dispatch({ 
          type: 'UPDATE_PIECE_SUCCESS',
          payload: response
        })
      }).catch(err=>{
        dispatch({type: 'UPDATE_PIECE_ERROR' }, err)
      })
    } else {
      // If no existing piece, create a new one
      firestore.collection('Pieces').add({
        content: writing,
        owner: authorId,
        prompt: prompt,
        createdAt: new Date()
      }).then((response) => {
        console.log(response)
        dispatch({ 
          type: 'CREATE_PIECE_SUCCESS',
          payload: response
        })
      }).catch(err => {
        dispatch({ type: 'CREATE_PIECE_ERROR' }, err)
      })
    }
    

   
  // TODO Call cloud function to save writing
  // * create piece if no id
  // * update piece if there is an id
  // * move previous version of piece to PieceHistory collection

    // firebase.auth().signOut().then(() => {
    //   dispatch({ type: 'SAVE_SUCCESS' })
    // });
  }

  

}
