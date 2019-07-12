import React from 'react';
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {deletePiece} from '../../store/actions/userActions'
import {Link, Redirect} from 'react-router-dom'
import './Pieces.scss'
import Button from '../ui/Button/Button';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon'
import EditIcon from '../icons/EditIcon/EditIcon'

const Pieces = (props) => {
  
  if (!props.auth.uid) return <Redirect to='/' /> 
  
  const {pieces} = props

  const deletePiece = (pieceID,pieceTitle) => {
    if ( typeof(pieceTitle) === 'undefined' ) pieceTitle = 'this piece'
    if( window.confirm('Are you sure you want to delete '+pieceTitle+'?') ){
      console.log('DELETE CONFIRMED')
      props.deletePiece(pieceID)
    }
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
                <div className="piece-actions">
                  <Button
                      className="delete-button"
                      icon={<DeleteIcon/>}
                      size="small"
                      circle={true}
                      itemID={pieceID}
                      onClick={()=>{deletePiece(pieceID,piece.title)}}
                  />
                  <Link to={'/writing/'+pieceID}>
                    <Button
                      className="edit-prompt"
                      circle={true}
                      icon={<EditIcon/>}
                    />
                  </Link>
                </div>
  
                
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
  firestoreConnect( (props) => { 
    if (props.auth.uid)
      return ([{
        collection: 'Pieces',
        where: [['uid', '==', props.auth.uid]],
      }])
    else return ([])
  })
)(Pieces)

