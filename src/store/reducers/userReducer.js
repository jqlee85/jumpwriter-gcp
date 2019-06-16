// User Reducer
const initState = {
  updatePieceStatus: null,
  updatedpieceID: null,
  createPieceStatus: null,
  createdpieceID: null,
  data:null,
  status:null
}

const userReducer = ( state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PIECE_SUCCESS':
      console.log('CREATE_PIECE_SUCCESS')
      return { 
        ...state, 
        createPieceStatus: 'success',
        pieceID: action.payload.id,
        data: action.payload, 
        status: 'received' 
      }
    case 'CREATE_PIECE_ERROR':
      console.log('CREATE_PIECE_ERROR')  
      return { 
        ...state, 
        createPieceStatus: 'error',
        data: action.payload, 
        status: 'error' 
      }
    case 'UPDATE_PIECE_SUCCESS':
      console.log('UPDATE_PIECE_SUCCESS')
      return { 
        ...state,
        updatePieceStatus: 'success',
        data: action.payload, 
        status: 'received' 
      }
    case 'UPDATE_PIECE_ERROR':
      console.log('UPDATE_PIECE_ERROR')  
      return { 
        ...state,
        updatePieceStatus: 'error',
        data: action.payload, 
        status: 'error' 
      }
    default:
      return state;
  }
}

export default userReducer;

