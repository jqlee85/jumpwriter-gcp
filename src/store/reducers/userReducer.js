// User Reducer

const initState = {
  saveWritingStatus: null
}

const userReducer = ( state = initState, action) => {
  switch (action.type) {
    case 'SAVE_WRITING_SUCCESS':
      return { ...state, type: 'image', data: action.payload, status: 'received' };
    case 'SAVE_WRITING_ERROR':
      return { ...state, type: 'image', data: action.payload, status: 'error' };
    default:
      return state;
  }
}

export default userReducer;

