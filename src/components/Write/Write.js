import React, {Component} from 'react';
import Prompt from '../Prompt/Prompt';
import WritePage from '../WritePage/WritePage';
import {Link} from 'react-router-dom';

export default function Write(props) {
  
  return <div className="write">
    <Prompt 
      prompt={props.prompt}
      getImagePrompt={props.getImagePrompt}
      getTextPrompt={props.getTextPrompt}
    />
    <WritePage />
  </div>

}

