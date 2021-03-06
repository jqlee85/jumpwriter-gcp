// Prompt Reducer

const promptState = {
  data: null,
  type: null,
  status: null
}

const promptReducer = ( state = promptState, action) => {
  switch (action.type) {
    case 'FETCH_IMAGE_PROMPT_SUCCESS':
      return { ...state, type: 'image', data: action.payload, status: 'received' }
    case 'FETCH_IMAGE_PROMPT_REQUEST':
      return { ...state, type: 'image', status: 'requested' }
    case 'FETCH_IMAGE_PROMPT_ERROR':
      return { ...state, type: 'image', data: action.payload, status: 'error' }
    case 'FETCH_TEXT_PROMPT_SUCCESS':
      return { ...state, type: 'text', data: action.payload, status: 'received' }
    case 'FETCH_TEXT_PROMPT_REQUEST':
      return { ...state, type: 'text', status: 'requested' }
    case 'FETCH_TEXT_PROMPT_ERROR':
      return { ...state, type: 'text', data: action.payload, status: 'error' }
    case 'CLEAR_PROMPT_DATA':
      return { ... state, type: null, data: null, status: null }
    default:
      return state;
  }
}

export default promptReducer;

