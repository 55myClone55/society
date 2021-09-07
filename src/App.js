import './App.css';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/Login/Login';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
///import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializApp } from './components/redux/app_reducer ';
import Svg from './components/common/svg/Svg';
import { Redirect } from 'react-router';
import { Switch } from 'react-router';
import { withSuspense } from './hoc/withSuspense';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))




class App extends Component {
  catchAllUnhandlerErrors = (reason,promise) =>{
    alert('Some error occured')
  }
  componentDidMount() {
    this.props.initializApp()
    window.addEventListener('unhandledrejection',this.catchAllUnhandlerErrors)
  }
  componentWillUnmount(){
    window.removeEventListener('unhandledrejection',this.catchAllUnhandlerErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Svg />
    }
    return (

      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
                  <Route path='/dialogs'
            render={withSuspense(DialogsContainer)} />
          <Route path='/profile/:userId'
            render={withSuspense(ProfileContainer)} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <LoginPage />} />
        
          
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializApp }))(App);
