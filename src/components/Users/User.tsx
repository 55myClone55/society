import React,{FC} from "react";
import styles from './users.module.css';
import userPhoto from '../../aseets/users.png'
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress:Array<number>
    unfollow:(userId:number)=> void
     follow:(userId:number)=> void

}


let User:React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user.id)}
                            onClick={() => { unfollow(user.id) }}>
                            unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id) }}>
                            follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>
    )
}

export default User;