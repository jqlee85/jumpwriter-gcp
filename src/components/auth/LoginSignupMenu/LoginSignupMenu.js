import React from 'react'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import './LoginSignupMenu.css'

const LoginSignupMenu = () => {
  return (
    <div className="login-signup-menu">
      <SignIn/>
      <SignUp/>
    </div>
  )
}

export default LoginSignupMenu
