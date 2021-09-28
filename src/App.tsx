import './App.css';
import s from './components/Navbar/Navbar.module.css'
import Svg from './components/common/svg/Svg'
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';
import { withSuspense } from './hoc/withSuspense';
import { AppHeader } from './components/Header/Header';
import { UsersPage } from './components/Users/UsersContainer';
import store from './components/redux/Redux-store';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Link, NavLink, Route, withRouter } from 'react-router-dom';
import { Component } from 'react';
import { connect,Provider } from 'react-redux';
import { compose } from 'redux';
import { initializApp } from './components/redux/app_reducer ';
import { AppStateType } from './components/redux/Redux-store';
import { Login } from './components/Login/Login';
import { Button } from 'antd/lib/radio';
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';




const { SubMenu } = Menu;
const {  Content, Footer, Sider } = Layout;

const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
//@ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))



const SuspendeDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

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
           <Layout>
    <AppHeader/>

    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['2']}
            //defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            
            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
              <Menu.Item key="1"> <Link to='/profile' > Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/dialogs'> Messages</Link></Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to='/developers' > Developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9"><Link to='/chat' > Chat</Link></Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div className="app-wrapper">
         
        <Navbar />
         <div className="app-wrapper-content">
         <Route exact path='/'
             render={()=> <Redirect to={'/profile'}/>} />
                   <Route path='/dialogs'
             render={()=><SuspendeDialogs/>} />
           <Route path='/profile/:userId?'
             render={()=> <SuspendedProfile/> } />
           <Route path='/developers' render={() => <UsersPage pageTitle={'vawy'} />} />
           <Route path='/login' render={() =>  <Login />} />
           <Route path='*' render={() => <div>ERROR 404</div>} />
           <Route path='/chat' render={() => <SuspendedChatPage/>} />
         </div>
       </div>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Social Network 2021</Footer>
  </Layout>

      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      //             <Route path='/dialogs'
      //       render={()=><SuspendeDialogs/>} />
      //     <Route path='/profile/:userId?'
      //       render={()=> <SuspendedProfile/> } />
      //     <Route path='/users' render={() => <UsersPage pageTitle={'any'} />} />
      //     <Route path='/login' render={() =>  <Login />} />
      //     <Route path='*' render={() => <div>ERROR 404</div>} />
          
      //   </div>
      // </div>

    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializApp }))(App);
