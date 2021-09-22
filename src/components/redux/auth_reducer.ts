import { FormAction, stopSubmit } from "redux-form";
//@ts-ignore
import {securityAPI} from "../../API/security-api"
import {authAPI}from "../../API/auth-api"
import {  ResultCodeEnum,  RresultCodeForCaptchaEnum } from "../../API/api";
import React from 'react'
import {BaseThunkType,InfernActionTypes} from './Redux-store'

let initialState = {
    userId: null as number | null,
    email: null as  string | null ,
    login: null as  string | null,
    isAuth: false,
    captchaUrl:null as  string | null

};


const authReduser = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            //@ts-ignore
        return {
                ...state,
                ...action.payload

            }
            default:
            return state;
    }

}

export const actions = {
    setAuthUserData : (userId:number | null, email:string | null, login:string | null, isAuth:boolean | null) => ({
        type:'SN/auth/SET_USER_DATA', payload:{ userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess : (captchaUrl:string)=> ({
        type:  'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload:{captchaUrl}
    } as const)
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        //@ts-ignore
        let { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email:string, password:string , rememberMe:boolean,captcha:string ):ThunkType => async (dispatch) => {

    let loginData = await authAPI.login(email, password, rememberMe,captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    }  
       else{
        if(loginData.resultCode ===  RresultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
            let message = loginData.messages.length > 0 ?
            loginData.messages[0] : 'some error'
        dispatch(stopSubmit('login', { _error: message }))

    }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
const data = await securityAPI.getCaptchaUrl()
const captchaUrl = data.url

dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

    
}
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReduser;

export type InitialStateType = typeof initialState

type ActionTypes = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>