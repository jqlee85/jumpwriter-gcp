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
    e.preventDefault();
    this.props.signUp(this.state);
  }

  handleGoogleSignup = (e) => {
    e.preventDefault();
    console.log('handleGoogleSignUp')
    // if validateEmail(this.state.email)
    this.props.signUp(this.state, 'google');
  }



  render() {
    const { auth, authError } = this.props;
    return (
      <div className="signup-container">
        <form onSubmit={this.handleSubmit}>
          <h4 >Sign Up</h4>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} value={this.state.password}/>
          </div>
          <button>Sign Up</button>
          <div>
            { authError ? <p>{authError}</p> : null }
          </div>
        </form>
        <button onClick={this.handleGoogleSignup}>Create With Google/Gmail Account</button>
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
