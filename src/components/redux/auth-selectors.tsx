import { createSelector } from "reselect"
import { AppStateType } from "./Redux-store"

export const selectIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUseLogin = (state:AppStateType) => {
    return state.auth.login
}
