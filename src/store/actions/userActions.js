
export const saveWriting = (writing, pieceID=null, promptType=null, promptContent=null) => {
  
  return (dispatch, getState, {getFirestore}) => {
    
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
      
      let title = (promptType === 'text') ? promptContent : null

      firestore.collection('Pieces').add({
        content: writing,
        uid: authorId,
        promptType: promptType,
        prompt: promptContent,
        title: title,
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
    
  }

}

export const deletePiece = (pieceID=null) => {
  
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    console.log('action called')
    console.log('pieceID:',pieceID)

    if (pieceID){
      console.log('PIECE ID EXISTS...',pieceID)

      firestore.collection('Pieces').doc(pieceID).delete()
        .then((response)=>{
          console.log(response)
          dispatch({ 
            type: 'DELETE_PIECE_SUCCESS',
            payload: response
          })
        }).catch(err=>{
          dispatch({type: 'DELETE_PIECE_ERROR' }, err)
        })
    }
  }

}
