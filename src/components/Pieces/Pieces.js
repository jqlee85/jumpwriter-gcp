import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {deletePiece} from '../../store/actions/userActions'
import {Link} from 'react-router-dom'
import './Pieces.css'
import Button from '../ui/Button/Button';

const Pieces = (props) => {
    
  const {pieces} = props

  const deletePiece = (pieceID,pieceTitle) => {
    console.log('delete ',pieceID)
    if ( typeof(pieceTitle) === 'undefined' ) pieceTitle = 'this piece'
    if( window.confirm('Are you sure you want to delete '+pieceTitle+'?') ){
      console.log('DELETE CONFIRMED')
      props.deletePiece(pieceID)
    }
    // alert('Are you sure you want to delete '+pieceTitle+'?')
    // props.deletePiece(pieceID)
  }

  return (
    <div className="pieces">
      <h1>Pieces</h1>
      {pieces && Object.keys(pieces).length > 0 && 
        Object.keys(pieces).map((pieceID)=>{
          let piece = pieces[pieceID]
          if (piece) {
            return(
              <div className="list-piece" datapieceid={pieceID} key={pieceID}>
                <h3>{piece.title}</h3>
                <p>{piece.content}</p>
                <Button
                    className="delete-button"
                    // onClick={saveWriting}
                    size="small"
                    circle={true}
                    // status={buttonStatus}
                    itemID={pieceID}
                    onClick={()=>{deletePiece(pieceID,piece.title)}}
                    // onClick={() => {}
                />
                <Link to={'/writing/'+pieceID}>
                  <Button
                    className="edit-prompt"
                    circle={true}
                  />
                </Link>
  
                
              </div>
            )
          } else {
            return null
          }
          
          
          
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

const mapDispatchToProps = (dispatch)=> {
  return {
    deletePiece: (pieceID) => dispatch(deletePiece(pieceID))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect( props => { return ([{
      collection: 'Pieces',
      where: [['uid', '==', props.auth.uid]],
    }])
  })
)(Pieces)

