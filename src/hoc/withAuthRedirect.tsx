import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux"
import { AppStateType } from '../components/redux/Redux-store';

let mapStateToPropsForRedirect = (state:AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth:boolean
}
type DispatchPropsType = {
   
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType) {

   const RedirectComponent:React.FC<MapPropsType & DispatchPropsType> = (props)=> {
        let {isAuth, ...restProps} = props
            if (!isAuth) return <Redirect to='/login' />

            return <WrappedComponent {...props} />
            }

    let ConnectAuthRedirectComponent = connect<MapPropsType , DispatchPropsType,WCP,AppStateType>(mapStateToPropsForRedirect,{})(RedirectComponent);

    return ConnectAuthRedirectComponent;
}