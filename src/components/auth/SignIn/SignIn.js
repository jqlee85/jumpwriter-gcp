import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../../store/actions/authActions'
import { signUp } from '../../../store/actions/authActions'
import  './SignIn.scss';

class SignIn extends Component {
  
  state = {
    email: '',
    password: ''
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleEmailLogin = (e) => {
    console.log('handleSubmit')
    e.preventDefault()
    this.props.signIn(this.state)
  }
  
  handleGoogleLogin = (e) => {
    console.log('handleGoogleSignUp')
    e.preventDefault()
    this.props.signIn(this.state, 'google')
  }

  handleFacebookLogin = (e) => {
    console.log('handleFacebookSignUp')
    e.preventDefault()
    this.props.signIn(this.state, 'facebook')
  }

  handleEmailSignup = (e) => {
    console.log('handleSubmit')
    e.preventDefault();
    this.props.signUp(this.state);
  }

  handleGoogleSignup = (e) => {
    e.preventDefault()
    console.log('handleGoogleSignUp')
    this.props.signUp(this.state, 'google');
  }

  handleFacebookSignup = (e) => {
    console.log('handleFacebookSignUp')
    e.preventDefault()    
    this.props.signUp(this.state, 'facebook')
  }

  render() {

    const {authError} = this.props

    return (
      <div className="signin-container">
        <form onSubmit={()=>{}}>
          <h4>Login</h4>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="login-form-buttons">
            <button className="login-button" onClick={this.handleEmailLogin}>Email Login</button>
            <button className="google-auth-button" onClick={this.handleGoogleLogin}>Google Login</button>
            <button className="facebook-auth-button" onClick={this.handleFacebookLogin}>Facebook Login</button>  
          </div>
          <div className="error-message">
            { authError ? <p>{authError}</p> : null }
          </div>
          <h5 className="signup-form-text">Not a user? Sign up</h5>
          <div className="signup-form-buttons">
            <button className="login-button" onClick={this.handleEmailSignup}>Email Signup</button>
            <button className="google-auth-button" onClick={this.handleGoogleSignup}>Google Signup</button>  
            <button className="facebook-auth-button" onClick={this.handleFacebookSignup}>Facebook Signup</button>  
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds,signInMethod) => dispatch(signIn(creds,signInMethod)),
    signUp: (creds,signUpMethod) => dispatch(signUp(creds,signUpMethod))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)

