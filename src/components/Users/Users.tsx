import React, {FC, useEffect} from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {Formik,Form,Field} from 'formik'
import { FilterType } from "../redux/users_reducer";
import {UsersSearchForm} from './UsersSearchForm'
import { useDispatch, useSelector } from "react-redux";
import {getTotalUsersCount,getCurrentPage,getPageSize, getUsersFilter,getUsers,getFollowingInProgress} from './../redux/users-selectors'
import { useHistory } from "react-router-dom";
import * as queryString from 'querystring'


type PropsType = {}
type QueryParamsType = {term?: string; page?: string;friend?: string} 
//@ts-ignore
export const Users: FC<PropsType> = ( props )=>{
  
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const users = useSelector(getUsers)
       const followingInProgress =  useSelector(getFollowingInProgress)

const dispatch = useDispatch()
const history = useHistory()

 
useEffect(() => {
       const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

       let actualPage = currentPage
       let actualFilter = filter
       if(!!parsed.page) actualPage = Number(parsed.page)
       if(!!parsed.term) actualFilter = {...actualFilter,term: parsed.term as string}
       switch(parsed.friend){
           case 'null':
               actualFilter = {...actualFilter,friend: null}
               break;
               case 'true':
                   actualFilter = {...actualFilter, friend: true}
                   break;
                case 'false':
            actualFilter = {...actualFilter, friend: false}
            break;
       }

    //@ts-ignore
    dispatch(getUsers(actualPage, pageSize,actualFilter));
},[])

useEffect(() => {
const query: QueryParamsType = {}
if(!!filter.term) query.term = filter.term
if(filter.friend !== null) query.friend = String(filter.friend)
if(currentPage !== 1) query.page = String(currentPage)

    history.push({
        pathname:'/developers',
        search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    }) 
    
 }, [filter,currentPage])


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
                                  users.map((u: any) => <User user={u}
                                         followingInProgress={followingInProgress}
                                          unfollow={unfollow}
                                         follow={follow}
                                         key={u.id} />)
            }
                   </div>
     </div>
 
    }


