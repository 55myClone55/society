import React from 'react'
import { getAuthUserData } from './auth_reducer'
import {InfernActionTypes} from './Redux-store'

let initialState = {
    initialized: false
    
};

export type InitialStateType = typeof initialState
type ActionsType = InfernActionTypes<typeof actions> 

const appReduser = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALALIZED_SUCCESS':
            return {
                initialized: true
            }
        default:
            return state;
    }

}


export const actions = {
         initializedSuccess: () => ({type: 'SN/APP/INITIALALIZED_SUCCESS' }as const)
}


export const initializApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })

}

export default appReduser;