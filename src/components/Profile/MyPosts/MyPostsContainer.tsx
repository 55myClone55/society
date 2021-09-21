import React from "react";
import { actions } from "../../redux/Profile_reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux"
import { MapPropsType,DispatchPropsType } from "./MyPosts";
import { AppStateType } from "../../redux/Redux-store";

const mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
            } as MapPropsType
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        addPost: (newPostText:any) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;