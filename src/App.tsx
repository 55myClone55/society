import './App.css';
import Svg from './components/common/svg/Svg'
import { withSuspense } from './hoc/withSuspense';
import HeaderContainer from './components/Header/HeaderContainer';
import { UsersPage } from './components/Users/UsersContainer';
import store from './components/redux/Redux-store';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { Component } from 'react';
import { connect,Provider } from 'react-redux';
import { compose } from 'redux';
import { initializApp } from './components/redux/app_reducer ';
import { AppStateType } from './components/redux/Redux-store';
import { Login } from './components/Login/Login';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
//@ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))


const SuspendeDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispathPropsType = {
  initializApp: ()=> void
}


class App extends Component<MapPropsType & DispathPropsType> {
  catchAllUnhandlerErrors = (e:PromiseRejectionEvent) =>{
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
            render={()=><SuspendeDialogs/>} />
          <Route path='/profile/:userId'
            render={()=> <SuspendedProfile/> } />
          <Route path='/users' render={() => <UsersPage pageTitle={'any'} />} />
          <Route path='/login' render={() => <Login />} />
        
          
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializApp }))(App);
