import React from 'react'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import './LoginSignupMenu.scss'

const LoginSignupMenu = () => {
  return (
    <div className="login-signup-menu-wrapper">
      <div className="login-signup-menu">
        <SignIn/>
        <SignUp/>
      </div>
    </div>
  )
}

export default LoginSignupMenu
