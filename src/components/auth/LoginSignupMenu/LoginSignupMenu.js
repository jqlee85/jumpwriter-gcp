import React from 'react'
import SignIn from '../SignIn/SignIn'
import './LoginSignupMenu.scss'

const preventExit = (e) => {
  e.stopPropagation()
}

const LoginSignupMenu = () => {
  return (
    <div className="login-signup-menu" onClick={preventExit}>
      <SignIn/>
    </div>
  )
}

export default LoginSignupMenu
