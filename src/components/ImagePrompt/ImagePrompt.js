import React, {Component} from 'react';
import './ImagePrompt.css';
import LoadingIcons from '../LoadingIcons/LoadingIcons';

const unsplashAppName = 'JumpWriter';

const ImagePrompt = (props) => {

  return <div className="image-prompt-wrapper">
    {props.prompt.status == 'requested' && <LoadingIcons />}
    {props.prompt.status == 'received' &&
      <div className="prompt-image">
        <img src={props.prompt.data.urls.small} alt={props.prompt.data.alt_description}/>
        <div className="prompt-image-credit">
          <p>Photo by {props.prompt.data.user.username} on <a href={`${props.prompt.data.urls.small}?utm_source=${unsplashAppName}&utm_medium=referral&utm_campaign=api-credit`} target="_blank">Unsplash</a></p>
        </div>
      </div>
    }
    </div>
  
}


export default ImagePrompt
