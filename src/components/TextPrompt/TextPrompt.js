import React, {Component} from 'react';
import './TextPrompt.css';
import LoadingIcons from '../LoadingIcons/LoadingIcons';


class TextPrompt extends Component {

  render() {
    return <div className="text-prompt">
      {this.props.prompt.status == 'requested' && <LoadingIcons />}
      {this.props.prompt.status == 'received' && <h3>{this.props.prompt.data.text}</h3>}
    </div>
  }

}


export default TextPrompt
