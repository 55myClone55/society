import React from "react";
import Header, { DispatchPropsType } from "./Header";
import { connect, MapDispatchToProps } from "react-redux";
import { getAuthUserData } from "../redux/auth_reducer";
import { logout } from "../redux/auth_reducer";
import { AppStateType } from "../redux/Redux-store";
import {MapPropsType} from './Header'

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
}) 

export default connect<MapPropsType, DispatchPropsType,{}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);