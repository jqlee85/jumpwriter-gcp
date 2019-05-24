import React, {useState} from 'react';
import './WritePage.css';

export default function WritePage (props) {
  const [textContent, setTextContent] = useState();

  function handleTextContentChange(e) {
    setTextContent(e.target.value)
  }

  function saveWriting(e) {
    console.log(textContent);
  }

  return (
    <div className="write-page">
      <textarea className="write-textarea" onChange={handleTextContentChange} value={textContent} />
      <button className="save-prompt" onClick={saveWriting}>Save</button>
    </div>
  )
}

