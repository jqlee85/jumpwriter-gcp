import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import WritePage from '../WritePage/WritePage'
import {clearPieceData} from '../../store/actions/userActions'


const Edit = (props) => {
 
  const [pieceID,setPieceID] = useState(null)
  useEffect(()=>{
    setPieceID(props.match.params.pieceID)
  },[props.match.params.pieceID])

  useEffect(()=>{
    return (()=>{
      props.clearPieceData()
    })
  },[])

  return <div className="write">
    <WritePage 
      pieceID={pieceID} 
      showLoginOrSignup={props.showLoginOrSignup}
    />
  </div>

}

const mapStateToProps = (state,ownProps) => {
  const id = ownProps.match.params.pieceID 
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
    clearPieceData: () => dispatch(clearPieceData())
  }
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(Edit)
