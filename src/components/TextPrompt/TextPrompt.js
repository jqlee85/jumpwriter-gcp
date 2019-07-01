import React, {Component} from 'react';
import './TextPrompt.css';
import LoadingIcons from '../LoadingIcons/LoadingIcons';


const TextPrompt = (props) => {

  const {prompt} = props

  return <div className="text-prompt">
    {prompt.status == 'requested' && <LoadingIcons />}
    {prompt.status == 'received' && <h3>{prompt.data.promptContent}</h3>}
  </div>
  

}


export default TextPrompt
