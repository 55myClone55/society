import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
//import Post from "./MyPosts/Post ";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";





const Profile = (props) => {

    return <div>
        <ProfileInfo savePhoto={props.savePhoto}
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            saveProfile={props.saveProfile}
            updateStatus={props.updateStatus} />

        <MyPostsContainer />

    </div>
}


export default Profile