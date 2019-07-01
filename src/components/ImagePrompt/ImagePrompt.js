import React, {Component} from 'react';
import './ImagePrompt.css';
import LoadingIcons from '../LoadingIcons/LoadingIcons';

const unsplashAppName = 'JumpWriter';

const ImagePrompt = (props) => {

  const {prompt} = props

  return <div className="image-prompt-wrapper">
    {prompt.status == 'requested' && <LoadingIcons />}
    {prompt.status == 'received' &&
      <div className="prompt-image">
        <img src={prompt.data.promptContent.urls.small} alt={prompt.data.promptContent.alt_description}/>
        <div className="prompt-image-credit">
          <p>Photo by {prompt.data.promptContent.user.username} on <a href={`${prompt.data.promptContent.urls.small}?utm_source=${unsplashAppName}&utm_medium=referral&utm_campaign=api-credit`} target="_blank">Unsplash</a></p>
        </div>
      </div>
    }
    </div>
  
}


export default ImagePrompt
