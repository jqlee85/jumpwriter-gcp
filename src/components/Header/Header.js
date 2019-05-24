import React, {Component} from 'react'
import  './Header.css';
import MenuToggle from '../MenuToggle/MenuToggle';
import { Link } from 'react-router-dom';

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
    return <header id="header">
      <Link className="site-title" to='/' onClick={this.titleLinkClicked}><h1>JumpWriter</h1></Link>
      <MenuToggle navToggled={this.props.navToggled} toggleNav={this.linkClicked}/>
    </header>
  }

}

export default Header;