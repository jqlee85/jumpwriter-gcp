import React, {Component} from 'react';
import './ImagePrompt.css';
import LoadingIcons from '../LoadingIcons/LoadingIcons';

const unsplashAppName = 'JumpWriter';

class ImagePrompt extends Component {

  render() {
    return <div className="image-prompt-wrapper">
      {this.props.prompt.status == 'requested' && <LoadingIcons />}
      {this.props.prompt.status == 'received' &&
        <div className="prompt-image">
          <img src={this.props.prompt.data.imageSrc} alt={this.props.prompt.data.alt}/>
          <div className="prompt-image-credit">
            <p>Photo by {this.props.prompt.data.imageUserName} on <a href={`${this.props.prompt.data.imageUrl}?utm_source=${unsplashAppName}&utm_medium=referral&utm_campaign=api-credit`} target="_blank">Unsplash</a></p>
          </div>
        </div>
      }
      </div>
  }
}


export default ImagePrompt
