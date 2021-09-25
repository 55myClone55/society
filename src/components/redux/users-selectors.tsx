import { createSelector } from "reselect"
import { AppStateType } from "./Redux-store"

const getUsersPageSelector = (state:AppStateType) => {
    return state.usersPage.users
}
export const getUsersPage = createSelector(getUsersPageSelector,
    (users) => {
        return users.filter(u => true)
    })
export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize
}
export const getUsers = (state:AppStateType) => {
    return state.usersPage
}
export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFerching = (state:AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state:AppStateType) => {
    return state.usersPage.filter
}
