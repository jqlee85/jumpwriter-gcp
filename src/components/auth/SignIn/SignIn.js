import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../../store/actions/authActions'
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state)
  }
  
  handleGoogleLogin = (e) => {
    e.preventDefault()
    this.props.signIn(this.state, 'google')
  }

  handleFacebookLogin = (e) => {
    e.preventDefault()
    this.props.signIn(this.state, 'facebook')
  }

  render() {

    const {authError} = this.props

    return (
      <div className="signin-container">
        
        <form onSubmit={this.handleSubmit}>
          <h4>Login</h4>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="login-signup-form-buttons">
            <button className="login-button">Email Login</button>
            <button className="google-auth-button" onClick={this.handleGoogleLogin}>Google Login</button>
            <button className="facebook-auth-button" onClick={this.handleFacebookLogin}>Facebook Login</button>  
          </div>
          <div className="center red-text">
            { authError ? <p>{authError}</p> : null }
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
    signIn: (creds,signInMethod) => dispatch(signIn(creds,signInMethod))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)

