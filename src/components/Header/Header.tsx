import React,{FC} from "react";
import { Link, NavLink } from "react-router-dom";
import s from './Header.module.css';
import { Layout, Menu, Breadcrumb, Avatar, Row, Col,Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectCurrentUseLogin } from "../redux/auth-selectors";
import { logout } from "../redux/auth_reducer";


const { SubMenu } = Menu;
const { Header} = Layout;

export type MapPropsType = {}



export const AppHeader:React.FC<MapPropsType> = (props) => {
const isAuth = useSelector(selectIsAuth)
const login = useSelector(selectCurrentUseLogin)
const dispatch = useDispatch()
const logoutCallback =()=> {
    dispatch(logout())
}

    const { Header} = Layout;
    return<Header className="header">
 
    <Row>
      <Col span={18}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
       <Menu.Item key="1"><Link to='/developers' > Developers</Link></Menu.Item>
       </Menu>
      </Col>
      
      {isAuth
                 ? <> <Col span={1}> 
                     <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            </Col>
                      <Col span={4}> 
                                           <Button onClick={logoutCallback}>Log out</Button>
                      </Col>
                      </>
                 : <Col span={1}>
                     
                     <Button>
                     <Link to={'/login'}>Login</Link>
                   </Button>
                     </Col>}
    </Row>
    
    
    
    
    </Header>
    //<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    //  <header className={s.header}>
    //     <img src="data:image/png;base64,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"
    //         alt="" />
    //     <div className={s.loginBlock}>
    //         {props.isAuth
    //             ? <div> {props.login} - <button onClick={props.logout}>Log out</button></div>
    //             : <NavLink to={'/login'}>Login</NavLink>}
    //     </div>
    // </header>
}

