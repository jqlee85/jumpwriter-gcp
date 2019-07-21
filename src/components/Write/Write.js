import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import Prompt from '../Prompt/Prompt'
import WritePage from '../WritePage/WritePage'
import {clearCreatedPiece} from '../../store/actions/userActions'
import {clearPromptData} from '../../store/actions/promptActions'

const Write = (props) => {
 
  useEffect(()=>{
    return(()=>{
      props.clearCreatedPiece()
      props.clearPromptData()
    })   
  },[])
  

  // Redirect to edit page on piece creation.
  if (props.user.createdPieceID && props.user.createPieceStatus == 'success') {
    return <Redirect to={'/writing/'+props.user.createdPieceID} />
  }

  return <div className="write">
    <Prompt 
      prompt={props.prompt}
      getImagePrompt={props.getImagePrompt}
      getTextPrompt={props.getTextPrompt}      
    />
    <WritePage 
      showLoginOrSignup={props.showLoginOrSignup}
    />
  </div>

}

const mapStateToProps = (state,ownProps) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    user: state.user,
    prompt: state.prompt
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    clearCreatedPiece: () => dispatch(clearCreatedPiece()),
    clearPromptData: () => dispatch(clearPromptData())
  }
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(Write)



