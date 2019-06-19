import './App.scss';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import routes from './routes';
import {PropsRoute} from 'react-router-with-props';
import {connect} from 'react-redux';
import {fetchImagePrompt} from './store/actions/promptActions';
import {fetchTextPrompt} from './store/actions/promptActions';
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
import { stat } from 'fs';
import LoginSignupMenu from './components/auth/LoginSignupMenu/LoginSignupMenu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      navToggled: false,
      navFrontToggled: false,
      navInitialized: false,
      showLoginSignupMenu: false,
      showLoginSignupMenuMessage: null
    };  
  }

  toggleAppNav = () => {
    if ( this.state.navToggled && !this.state.navInitialized) {
      this.setState(prevState => ({
        navInitialized: true
      }));
    }
    // Change Navigation Z-Index
    if (this.state.navFrontToggled) {
      setTimeout(() => {
        this.setState(prevState => ({
          navFrontToggled: !prevState.navFrontToggled
        }));
      },400);
    } else {
      this.setState(prevState => ({
        navFrontToggled: !prevState.navFrontToggled
      }));
    }
    // Toggle the Navigation
    setTimeout(() => {
      this.setState(prevState => ({
        navToggled: !prevState.navToggled
      }));
    }, 100); 
  }

  // Show login or signup menu
  showLoginOrSignup = (message) => {
    message = (typeof(message)=== 'string') ? message : null
    this.setState(prevState => ({
      showLoginSignupMenu: true,
      showLoginSignupMenuMessage: message
    }))

  }

  hideLoginSignupMenu = () => {
    this.setState(prevState => ({
      showLoginSignupMenu: false,
      showLoginSignupMenuMessage: null
    }))
  }

  render(){
    
    let appClasses = 'App';
    if (this.state.navToggled) appClasses += ' app-menu-toggled';
    if (this.state.navFadeToggled) appClasses += ' nav-fade';

    return (
      <Router>
        <Route render={({ location }) => (
          <div className="App">
            <Nav 
              navToggled={this.state.navToggled} 
              userLogin={this.props.requestUserLogin} 
              userData={this.props.user} 
              userLogout={this.props.userLogout}
              toggleNav={this.toggleAppNav}
              navFront={this.state.navFrontToggled}
              navInitialized={this.state.navInitialized}
            />
            <Header 
              navToggled={this.state.navToggled} 
              toggleNav={this.toggleAppNav}
              signOut={this.props.signOut}
              loginOrSignup={this.showLoginOrSignup}
              user={this.props.user}
            />
            {!this.props.auth.uid && this.state.showLoginSignupMenu && 
              <div className="login-signup-menu-wrapper" onClick={this.hideLoginSignupMenu}>
                <LoginSignupMenu message={this.state.showLoginSignupMenuMessage}/>
              </div>
            }
            <div className="main">
              <Switch location={location}>
                {routes.map((route, i) => <PropsRoute 
                  key={i}
                  exact={route.exact} 
                  path={route.path} 
                  component={route.component} 
                  prompt={this.props.prompt}
                  user={this.props.user}
                  getImagePrompt={this.props.fetchImagePrompt}
                  getTextPrompt={this.props.fetchTextPrompt}
                  showLoginOrSignup={this.showLoginOrSignup}
                />)}
              </Switch>
            </div>
          </div>
        )}/>
      </Router>
    )
  }

}

// Application State
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    auth: state.firebase.auth,
    prompt: state.prompt,
    app: state.app,
    firebase: state.firebase
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchImagePrompt: () => {
      dispatch(fetchImagePrompt());
    },
    fetchTextPrompt: () => {
      dispatch(fetchTextPrompt());
    }
  }
}

// export default withFirebaseAuth(
//   { providers, firebaseAppAuth}
// )(
//   withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
// );

export default connect(mapStateToProps,mapDispatchToProps)(App)
