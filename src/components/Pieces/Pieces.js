import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Pieces.css';
import firebaseApp from '../../config/firebase'

let messageText = 'this is the message text'
let getPieces = firebaseApp.functions().httpsCallable('getPieces')

const Pieces = (props) => {
    
  const [pieces, setPieces] = useState([])
  console.log('pieces',pieces)
  useEffect(()=>{

    getPieces({text: messageText}).then((result)=>{
      console.log('result',result)
      setPieces(result.data)
    }).catch((error)=>{
      // Getting the Error details.
      var code = error.code
      var message = error.message
      var details = error.details
      console.log('error:',error)
    })

  },[])

  return (
    <div className="pieces">
      <h1>Pieces</h1>
      {pieces && Object.keys(pieces).length > 0 && 
        Object.keys(pieces).map((pieceKey)=>{
          let piece = pieces[pieceKey]
          console.log('piece = ',piece)
          return(
            <div>
              <h3>{piece.data.title}</h3>
              <p>{piece.data.content}</p>
              <Link to={'/writing/'+piece.id}><button>Edit</button></Link>
            </div>
          )
        })
      }
    </div>
  )

}

export default Pieces
