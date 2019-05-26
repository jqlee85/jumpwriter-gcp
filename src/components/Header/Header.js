import React, {Component} from 'react'
import  './Header.scss';
import MenuToggle from '../MenuToggle/MenuToggle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

class Header extends Component {

  constructor(props){
    super(props);
    this.linkClicked = this.linkClicked.bind(this)
    this.titleLinkClicked = this.titleLinkClicked.bind(this)
  }

  titleLinkClicked() {
    if (this.props.navToggled) {
      this.props.toggleNav();  
    }
  }

  linkClicked() {
    this.props.toggleNav();
  }

  render(){
    
    console.log('PROPS',this.props)

    return <header id="header">
      <Link className="site-title" to='/' onClick={this.titleLinkClicked}><h1>JumpWriter</h1></Link>
      <div className="right-items">
        <div className="header-auth">
          { this.props.auth.uid
            ? <div>
                <button onClick={this.props.signOut}>Sign out</button>
              </div>
            : <div>
                <button onClick={this.props.loginOrSignup}>Login/Signup</button>
              </div>
          }
        </div>
        <MenuToggle navToggled={this.props.navToggled} toggleNav={this.linkClicked}/>
      </div>
    </header>
  }

}

// Application State
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    app: state.app,
    firebase: state.firebase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
