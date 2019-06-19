import React from 'react'
import SignIn from '../SignIn/SignIn'
import './LoginSignupMenu.scss'

const preventExit = (e) => {
  e.stopPropagation()
}

const LoginSignupMenu = (props) => {
  
  let {message} = props

  return (
    <div className="login-signup-menu" onClick={preventExit}>
      <SignIn message={message}/>
    </div>
  )
}

export default LoginSignupMenu
