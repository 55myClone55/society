import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
//import Post from "./MyPosts/Post ";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "./../../types/types";

type PropsType = {
    profile:PropsType | null
     status:string
      updateStatus:(status:string)=> void
       isOwner:boolean
        savePhoto:(file: File) => void
         saveProfile:(profile: ProfileType)=> Promise<any>
}


const Profile:React.FC<PropsType> = (props) => {

    return <div>
        <ProfileInfo savePhoto={props.savePhoto}
            isOwner={props.isOwner}
            //@ts-ignore
            profile={props.profile}
            status={props.status}
            saveProfile={props.saveProfile}
            updateStatus={props.updateStatus} />

        <MyPostsContainer />

    </div>
}


export default Profile