import React, {Component} from 'react'
import './LoadingIcons.css';
import CameraIcon from '../CameraIcon/CameraIcon';

class LoadingIcons extends Component {

  render(){
    return <div className="prompt-types jo-chasing-icons">
      <button className="jw-button circle-button jo-chasing-icon jo-icon-1" onClick={this.textPrompt}><span>TEXT</span></button>
      <button className="jw-button circle-button prompt-image-button jo-chasing-icon jo-icon-2" onClick={this.imagePrompt}><CameraIcon iconWidth="30px" color="#fff" hoverColor="#3ae0b1" /></button>
    </div>
  }

}

export default LoadingIcons
