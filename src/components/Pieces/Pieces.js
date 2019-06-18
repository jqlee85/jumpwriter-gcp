import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import './Pieces.css';

const Pieces = (props) => {
    
  const {pieces} = props

  return (
    <div className="pieces">
      <h1>Pieces</h1>
      {pieces && Object.keys(pieces).length > 0 && 
        Object.keys(pieces).map((pieceID)=>{
          let piece = pieces[pieceID]
          console.log('piece = ',piece)
          return(
            <div className="list-piece" datapieceid={pieceID} key={pieceID}>
              <h3>{piece.title}</h3>
              <p>{piece.content}</p>
              <Link to={'/writing/'+pieceID}><button>Edit</button></Link>
            </div>
          )
        })
      }
    </div>
  )

}


const mapStateToProps = (state,ownProps) => {
  const pieces = state.firestore.data.Pieces;  
  return {
    pieces: pieces,
    auth: state.firebase.auth,
    authError: state.auth.authError,
    user: state.user,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect( props => { return ([{
      collection: 'Pieces',
      where: [['uid', '==', props.auth.uid]],
    }])
  })
)(Pieces)
