import React,{FC} from 'react';
import { connect, useSelector } from 'react-redux';
import { getUsers, follow, unfollow, FilterType } from '../redux/users_reducer';

import {AppStateType} from './../redux/Redux-store'
import Svg from '../common/svg/Svg'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getFollowingInProgress, getPageSize, getTotalUsersCount, getCurrentPage, getIsFerching, getUsersPage } from '../redux/users-selectors';
import { UserType } from '../../types/types';
import {getUsersFilter} from './../redux/users-selectors'
import { Users } from './Users';

type UsersPagePropsType = {
    pageTitle:string
}
export const UsersPage:React.FC<UsersPagePropsType> = (props)=> {
const  isFetching = useSelector(getIsFerching)
//@ts-ignore
    return <>
    <h2>{props.pageTitle}</h2>
         {isFetching ? <Svg /> : null}
         
        <Users/>
     </>
}


