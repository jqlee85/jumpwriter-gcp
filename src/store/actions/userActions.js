
export const clearPieceData = () => {
  return { 
    type: 'CLEAR_PIECE_DATA'
  }
}

export const clearCreatedPiece = () => {
  return { 
    type: 'CLEAR_CREATED_PIECE'
  }
}

export const saveWriting = (writing, pieceID=null, prompt=null) => {
  
  return (dispatch, getState, {getFirestore}) => {
    
    const firestore = getFirestore()
    const authorId = getState().firebase.auth.uid;
    
    if (pieceID){
      console.log('PIECE ID EXISTS...',pieceID)
      firestore.collection('Pieces').doc(pieceID).update({
        content: writing,
        updatedAt: new Date(),
      }).then((response)=>{
        dispatch({ 
          type: 'UPDATE_PIECE_SUCCESS',
          payload: response
        })
      }).catch(error=>{
        console.error(error)
        dispatch({type: 'UPDATE_PIECE_ERROR' }, error)
      })
    } else {
      // If no existing piece, create a new one
      
      let title = (prompt.promptType === 'random three word text') ? prompt.promptContent : null
      if (prompt.promptType === 'random unsplash image') title = prompt.promptContent.alt_description
      let promptType = prompt.promptType || null
      let promptContent = prompt.promptContent || null


      firestore.collection('Pieces').add({
        content: writing,
        uid: authorId,
        promptType: promptType,
        promptContent: promptContent,
        prompt: prompt,
        title: title,
        createdAt: new Date()
      }).then((response) => {
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
    if (pieceID){
      firestore.collection('Pieces').doc(pieceID).delete()
        .then((response)=>{
          dispatch({ 
            type: 'DELETE_PIECE_SUCCESS',
            payload: response
          })
        }).catch(error=>{
          console.error(error)
          dispatch({type: 'DELETE_PIECE_ERROR' }, error)
        })
    }
  }

}
