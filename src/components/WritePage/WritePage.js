import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import './WritePage.css';
import {saveWriting} from '../../store/actions/userActions';

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
    console.log('setpieceid',props.pieceID)
    setPieceID(props.pieceID)
  },[props.pieceID])

  const handleTextContentChange = (e) => {
    setTextContent(e.target.value)
  }

  const getWriting = () => {

  }

  const saveWriting = (e) => {
    console.log(textContent);
    // if not logged in, pop up login/register prompt
    if (props.auth.uid) {
      console.log('logged in, do save')
      // console.log('e.target',e.target)
      console.log('save to ID',pieceID)
      props.saveWriting(textContent,pieceID)

    } else {
      console.log('not logged in, display login form and message')
    }

  }



  console.log('Writepage',props)

  return (
    <div className="write-page">
      <textarea className="write-textarea" onChange={handleTextContentChange} value={textContent} datapieceID={pieceID} />
      <button className="save-prompt" onClick={saveWriting}>Save</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(WritePage)

