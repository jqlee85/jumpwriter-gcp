import "isomorphic-fetch";

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
  dispatch(fetchImagePromptRequest());
  return fetch("https://api.jumpwriter.com/wp-json/jumpwriter-theme/v1/image-prompt/")
    .then(response => response.json())
    .then(imagePrompt => dispatch(fetchImagePromptSuccess(imagePrompt)))
    .catch(err => dispatch(fetchImagePromptError(err)));
};

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
  dispatch(fetchTextPromptRequest());
  
  return fetch("https://api.jumpwriter.com/wp-json/jumpwriter-theme/v1/noun-verb-prompt/")
    .then(response => response.json())
    .then(textPrompt => dispatch(fetchTextPromptSuccess(textPrompt)))
    .catch(err => dispatch(fetchTextPromptError(err)));
};

