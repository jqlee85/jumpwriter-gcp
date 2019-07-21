import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './WritePage.scss'
import {saveWriting} from '../../store/actions/userActions'
import Button from '../ui/Button/Button'

const WritePage = (props) => {
  
  const [textContent, setTextContent] = useState('')
  const [pieceID, setPieceID] = useState(null)
  
  useEffect(()=>{
    if (!props.pieceID && props.user.pieceID) {
      setPieceID(props.user.pieceID)
    }
  },[props.user.pieceID])

  useEffect(()=>{
    setPieceID(props.pieceID)
  },[props.pieceID])

  useEffect(()=>{
    if (pieceID && props.piece && props.piece.content) {
      setTextContent(props.piece.content)
    }
  },[props.piece])

  const [buttonStatus, setButtonStatus] = useState('inactive')

  const handleTextContentChange = (e) => {
    setTextContent(e.target.value)
    if (e.target.value.length > 0) setButtonStatus('active')
  }

  const saveWriting = (e) => {
    if (props.auth.uid) {
      props.saveWriting(textContent,pieceID,props.prompt.data)
    } else {
      props.showLoginOrSignup('Please log in or sign up to save your writing.')
    }
  }

  return (
    <div className="write-page">
      <textarea className="write-textarea" onChange={handleTextContentChange} value={textContent} datapieceid={pieceID} />
      <Button
        className="save-prompt"
        onClick={saveWriting}
        size="large"
        circle={true}
        status={buttonStatus}
      />
    </div>
  )
}

const mapStateToProps = (state,ownProps) => {
  const id = ownProps.pieceID;
  const pieces = state.firestore.data.Pieces
  const piece = pieces ? pieces[id] : null
  return {
    piece: piece,
    auth: state.firebase.auth,
    authError: state.auth.authError,
    user: state.user,
    prompt: state.prompt
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    saveWriting: (writing, pieceID, prompt) => dispatch(saveWriting(writing, pieceID, prompt))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect( props => { return ([{
      collection: 'Pieces',
      doc: props.pieceID,
    }])
  })
)(WritePage)
