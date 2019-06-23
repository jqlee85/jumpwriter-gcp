import React, {Component} from 'react';
import styles from './Prompt.scss';
import ImagePrompt from '../ImagePrompt/ImagePrompt';
import TextPrompt from '../TextPrompt/TextPrompt';
import CameraIcon from '../CameraIcon/CameraIcon';
import {fetchImagePrompt} from '../../store/actions/promptActions';
import {fetchTextPrompt} from '../../store/actions/promptActions';
import {connect} from 'react-redux';


class Prompt extends Component {

  render(){
    return <div className="prompt">

      { ( this.props.prompt.status == 'requested' || this.props.prompt.status == 'received' )  && this.props.prompt.type == 'text' &&
        <TextPrompt prompt={this.props.prompt}/>
      }
      { ( this.props.prompt.status == 'requested' || this.props.prompt.status == 'received' ) && this.props.prompt.type == 'image' &&
        <ImagePrompt prompt={this.props.prompt} />
      }
      { !this.props.prompt.status &&
        <div className="prompt-types">
          <button className="jw-button circle-button jo-chasing-icon jo-icon-1" onClick={this.props.getTextPrompt}>
            <span>TEXT</span>
          </button>
          <button className="jw-button circle-button prompt-image-button jo-chasing-icon jo-icon-2" onClick={this.props.getImagePrompt}>
            <CameraIcon iconWidth="30px" color="#ffffff" hoverColor="#005a99" />
          </button>
        </div>
      }
    </div>
  }
}

export default Prompt;