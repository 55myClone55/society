import React, {FC} from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
    totalUsersCount:number
     pageSize:number
      currentPage:number
      onPageChanged:(pageNumber: number) => void 
      users: Array<UserType>
      followingInProgress: Array<number>
      follow:(userId: number)=> void 
      unfollow:(userId: number)=> void/// any | null//
}
// @ts-ignore
let Users:FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    // @ts-ignore
    return
    //     <div>
    //       <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
    //                 totalUsersCount={totalUsersCount} pageSize={pageSize} />
    //                <div>
    //         {
    //                             users.map(u => <User user={u}
    //                                    followingInProgress={props.followingInProgress}
    //                                     unfollow={props.unfollow}
    //                                    follow={props.follow}
    //                                     key={u.id} />)
    //         }
    //                </div>
    // </div>
 // @ts-ignore
    }

export default Users;