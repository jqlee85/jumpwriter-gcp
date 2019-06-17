import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './WritePage.css'
import {saveWriting} from '../../store/actions/userActions'

const WritePage = (props) => {
  
  // TODO get textContent from the document in firestore if pieceID is defined by the route
  
  const [textContent, setTextContent] = useState(null)
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

  const handleTextContentChange = (e) => {
    setTextContent(e.target.value)
  }

  const getWriting = () => {

  }

  const saveWriting = (e) => {
    
    // if not logged in, pop up login/register prompt
    if (props.auth.uid) {
      console.log('logged in, do save')
      // console.log('e.target',e.target)
      props.saveWriting(textContent,pieceID)

    } else {
      console.log('not logged in, display login form and message')
    }

  }

  console.log('PROPS',props)
  return (
    <div className="write-page">
      <textarea className="write-textarea" onChange={handleTextContentChange} value={textContent} datapieceid={pieceID} />
      <button className="save-prompt" onClick={saveWriting}>Save</button>
    </div>
  )
}

const mapStateToProps = (state,ownProps) => {
  const id = ownProps.pieceID;
  const pieces = state.firestore.data.Pieces;
  const piece = pieces ? pieces[id] : null
  return {
    piece: piece,
    auth: state.firebase.auth,
    authError: state.auth.authError,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    saveWriting: (writing, pieceID) => dispatch(saveWriting(writing, pieceID))
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
