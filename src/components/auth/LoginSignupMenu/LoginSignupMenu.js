import React from 'react'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import './LoginSignupMenu.scss'

const preventExit = (e) => {
  e.stopPropagation()
}

const LoginSignupMenu = () => {
  return (
    <div className="login-signup-menu" onClick={preventExit}>
      <SignIn/>
      {/* <SignUp/> */}
    </div>
  )
}

export default LoginSignupMenu
