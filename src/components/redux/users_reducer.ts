import { AppStateType } from './Redux-store';
import React from 'react';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
//@ts-ignore
import { usersAPI } from '../../API/api';
import { PhotosType , UserType} from '../../types/types';
import { updateObjectInArray } from '../../utils/objects-helper'
import { InfernActionTypes } from './Redux-store';
import {BaseThunkType} from './Redux-store'




let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>

};


const usersReduser = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SN/USERS/SET_USERS': {
            return { ...state, users: action.users }
        }

        case 'SN/USERS/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };

        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count };

        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };

        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        }
        default:
            return state;
    }

}



export const actions = {
   followSuccess : (userId:number) => ({ type: 'SN/USERS/FOLLOW', userId }as const),
     unfollowSuccess : (userId:number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
         setUsers : (users:Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
         setCurrentPage : (currentPage:number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
        setTotalUsersCount : (totalUsersCount:number) =>
        ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount }as const),
        toggleIsFetching : (isFetching:boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching }as const),
         toggleFollowingProgres : (isFetching:boolean, userId:number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId }as const)
}




export const getUsers = (page:number, pageSize:number):ThunkType => {
    return async (dispatch,getState) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollow = async (dispatch:Dispatch<ActionTypes>,
     userId:number,
     apiMethod:any,
      actionCreator:(userId:number)=> ActionTypes) => {
    //let apiMethod = userId.follow.bind(usersAPI)
    //let actionCreator = followSuccess
    dispatch(actions.toggleFollowingProgres(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgres(false, userId))
}


export const follow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI),actions.unfollowSuccess)
    }
}

export default usersReduser;
type ActionTypes = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
export type InitialStateType = typeof initialState