import React, {FC, useEffect} from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {Formik,Form,Field} from 'formik'
import { FilterType } from "../redux/users_reducer";
import {UsersSearchForm} from './UsersSearchForm'
import { useDispatch, useSelector } from "react-redux";
import {getTotalUsersCount,getCurrentPage,getPageSize, getUsersFilter,getUsers,getFollowingInProgress} from './../redux/users-selectors'


type PropsType = {
               
}
//@ts-ignore
export const Users: FC<PropsType> = ( props )=>{
  
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const users = useSelector(getUsers)
       const followingInProgress =  useSelector(getFollowingInProgress)

const dispatch = useDispatch()

useEffect(() => {
    //@ts-ignore
    dispatch(getUsers(currentPage, pageSize,filter));
},[])

const onPageChanged = (pageNumber:number) =>{
    //@ts-ignore
    dispatch(getUsers(pageNumber, pageSize,filter));
}
const unfollow = (userId:number) =>{
   dispatch(unfollow(userId))
}
const follow = (userId:number) =>{
    dispatch(follow(userId))
}
const onFilterChanged = (filter: FilterType) => {
    //@ts-ignore
    dispatch(getUsers(1, pageSize, filter));
     }

    return <div>
         <UsersSearchForm onFilterChanged={onFilterChanged}/>
            
          <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                     totalUsersCount={totalUsersCount} pageSize={pageSize} />
                    <div>
            {
                //@ts-ignore
                                 users.map(u => <User user={u}
                                        followingInProgress={followingInProgress}
                                         unfollow={unfollow}
                                        follow={follow}
                                        key={u.id} />)
            }
                   </div>
     </div>
 
    }


