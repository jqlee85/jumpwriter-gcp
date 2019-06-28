import "isomorphic-fetch";
import firebaseApp from '../../config/firebase'

let getPrompt = firebaseApp.functions().httpsCallable('getPrompt')

/* Actions */

/* Image Prompts */
export function fetchImagePromptRequest(){
  return {
    type: 'FETCH_IMAGE_PROMPT_REQUEST'
  }
}

export function fetchImagePromptSuccess(imagePrompt){
  return { 
    type: 'FETCH_IMAGE_PROMPT_SUCCESS', 
    payload: imagePrompt 
  }
}

export function fetchImagePromptError(err){
  return { 
    type: 'FETCH_IMAGE_PROMPT_ERROR',
    payload: err 
  }
}

export const fetchImagePrompt = () => (dispatch, getState) => {
  dispatch(fetchImagePromptRequest())
  getPrompt({promptType:'random image'}).then((result)=>{
    console.log('SUCCESSFUL Prompt RESULT:',result)
    fetchImagePromptSuccess(result.data)
  }).catch((error)=>{
    console.error('Error loading data:',error)
    dispatch(fetchImagePromptError(error))
  })
}

/* Text Prompts */
export function fetchTextPromptRequest(){
  return {
    type: 'FETCH_TEXT_PROMPT_REQUEST'
  }
}

export function fetchTextPromptSuccess(textPrompt){
  return { 
    type: 'FETCH_TEXT_PROMPT_SUCCESS', 
    payload: textPrompt 
  }
}

export function fetchTextPromptError(err){
  return { 
    type: 'FETCH_TEXT_PROMPT_ERROR',
    payload: err 
  }
}

export const fetchTextPrompt = () => (dispatch, getState) => {
  dispatch(fetchTextPromptRequest())
  getPrompt({promptType:'text'}).then((result)=>{
    console.log('SUCCESSFUL Prompt RESULT:',result)
    fetchTextPromptSuccess(result.data)
  }).catch((error)=>{
    console.error('Error loading data:',error)
    dispatch(fetchTextPromptError(error))
  })
}

