import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../../store/actions/authActions'
import {validateEmail } from '../../../lib/utilities'
import './SignUp.scss'

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    console.log('submitting')
    e.preventDefault();
    this.props.signUp(this.state);
  }

  handleGoogleSignup = (e) => {
    e.preventDefault()
    console.log('handleGoogleSignUp')
    this.props.signUp(this.state, 'google');
  }

  handleFacebookSignup = (e) => {
    e.preventDefault()
    console.log('handleFacebookSignUp')
    this.props.signUp(this.state, 'facebook')
  }



  render() {
    const { auth, authError } = this.props;
    return (
      <div className="signup-container">
        <form onSubmit={this.handleSubmit}>
          <h5>Not a user? Sign Up Below</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} value={this.state.password}/>
          </div>
          <div className="login-signup-form-buttons">
            <button>Email Signup</button>
            <button className="google-auth-button" onClick={this.handleGoogleSignup}>Google Signup</button>  
            <button className="facebook-auth-button" onClick={this.handleFacebookSignup}>Facebook Signup</button>  
          </div>
          <div>
            { authError ? <p>{authError}</p> : null }
          </div>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds,signUpMethod) => dispatch(signUp(creds,signUpMethod))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
