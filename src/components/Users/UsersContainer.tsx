import React from 'react';
import { connect } from 'react-redux';
import { getUsers, follow, unfollow, FilterType } from '../redux/users_reducer';
import Users from './Users';
import {AppStateType} from './../redux/Redux-store'
import Svg from '../common/svg/Svg'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getFollowingInProgress, getPageSize, getTotalUsersCount, getCurrentPage, getIsFerching, getUsersPage } from '../redux/users-selectors';
import { UserType } from '../../types/types';
import {getUsersFilter} from './../redux/users-selectors'


type MapStatePropsType = {
        currentPage:number
    pageSize:number
    totalUsersCount:number
    users:Array<UserType>
    isFetching:boolean
    followingInProgress: Array<number>
    filter:FilterType
   }

   type MapDispatchPropsType = {
    getUsers: (currentPage:number, pageSize: number, filter:FilterType)=> void
        follow:(userId: number)=> void 
    unfollow:(userId: number)=> void
}

type OwnPropsType = {
    pageTitle:string
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType



class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const { currentPage, pageSize,filter } = this.props
        this.props.getUsers(currentPage, pageSize,filter);
    }

    onPageChanged = (pageNumber:number) => {
        const { pageSize,filter } = this.props
        this.props.getUsers(pageNumber, pageSize,filter);
//@ts-ignore
    onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props
    this.props.getUsers(1, pageSize, filter);
     }

    }
    render() {



        return <>
       <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Svg /> : null}
                            
            <Users totalUsersCount = {this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                //@ts-ignore
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsersPage(state),
        //users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFerching(state),
        followingInProgress: getFollowingInProgress(state),
        filter:getUsersFilter(state)
    }
}

export default compose(
    // withAuthRedirect,
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, { follow, unfollow, getUsers })
    // @ts-ignore
)(UsersContainer)