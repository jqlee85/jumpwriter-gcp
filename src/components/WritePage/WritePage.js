import React, {useState} from 'react';
import {connect} from 'react-redux';
import './WritePage.css';
import {saveWriting} from '../../store/actions/userActions';

const WritePage = (props) => {
  const [textContent, setTextContent] = useState();

  function handleTextContentChange(e) {
    setTextContent(e.target.value)
  }

  function saveWriting(e) {
    console.log(textContent);
  }

  console.log('Writepage',props)

  return (
    <div className="write-page">
      <textarea className="write-textarea" onChange={handleTextContentChange} value={textContent} />
      <button className="save-prompt" onClick={saveWriting}>Save</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    saveWriting: (writing, pieceID) => dispatch(saveWriting(writing, pieceID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WritePage)

