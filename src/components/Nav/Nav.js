import React, {Component} from 'react';
import  './Nav.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component {

  constructor(props){
    super(props);
    this.routeLinkClicked = this.routeLinkClicked.bind(this)
  }

  routeLinkClicked() {
    this.props.toggleNav();
  }

  render() {
  
    let theClasses = 'main-nav';
    if (this.props.navToggled) theClasses += ' toggled';
    if (this.props.navFront) theClasses += ' front';
    if (this.props.navInitialized) theClasses += ' initialized';
    const {auth} = this.props

    console.log(this.props.auth)

    return <nav id="main-nav" className={theClasses}>
      <ul className="menu">
        <li><Link to='/write' onClick={this.routeLinkClicked}>Write</Link></li>
        {auth.uid &&
          <li><Link to='/writing/' onClick={this.routeLinkClicked}>My Writing</Link></li>
        }
        <li><Link to='/about' onClick={this.routeLinkClicked}>About</Link></li>
        <li><Link to='/contact' onClick={this.routeLinkClicked}>Contact</Link></li>
      </ul>
    </nav>;
  }

}

// export default Nav;


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

// const mapDispatchToProps = (dispatch)=> {
//   return {
//     signUp: (creds,signUpMethod) => dispatch(signUp(creds,signUpMethod))
//   }
// }

export default connect(mapStateToProps, null)(Nav)
