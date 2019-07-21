import React, {useState,useEffect} from 'react'
import Prompt from '../Prompt/Prompt'
import WritePage from '../WritePage/WritePage'

export default function Write(props) {
 
  const [pieceID,setPieceID] = useState(null)
  useEffect(()=>{
    setPieceID(props.match.params.pieceID)
  },[props.match.params.pieceID])

  const showLoginOrSignup = (message) => {
    props.showLoginOrSignup(message)
  }

  return <div className="write">
    <Prompt 
      prompt={props.prompt}
      getImagePrompt={props.getImagePrompt}
      getTextPrompt={props.getTextPrompt}      
    />
    <WritePage 
      pieceID={pieceID} 
      showLoginOrSignup={props.showLoginOrSignup}
    />
  </div>

}



