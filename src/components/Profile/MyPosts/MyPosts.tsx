import React, { Component,FC } from "react";
import { Field, reduxForm } from "redux-form";
import s from './MyPosts.module.css';
import Post from './Post/Post ';
import { createField, Input } from "../../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../../utils/validator/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import {InjectedFormProps } from 'redux-form'
import {LoginFormValuesType} from './../../Login/Login'
import { GetStryngKeys } from "../../common/FormsControls/FormsControls";
import { PostType } from "../../../types/types";

const maxLength10 = maxLengthCreator(10)

export type MapPropsType = {
    posts:Array<PostType>
}

export type DispatchPropsType = {
    addPost:(newPostText: string)=> void
    
}

const MyPosts:React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post message={p.message} likesCount={p.likesCount} />)

    let newPostElement = React.createRef();
    let onAddPost = (values:AddPostFormValuesType) => {
        props.addPost(values.newPostText)
            }
//@ts-ignore
    return (
        <div className={s.postsBlock}>
            <h3>my post</h3>
            
            {/* <AddNewPostFormRedux onSubmit={onAddPost} /> */}
            <div className={s.posts}>
                {postsElements}

            </div>
        </div>

    )
}
//@ts-ignore
type PropsType = {

}
type AddPostFormValuesTypeKeys = GetStryngKeys<AddPostFormValuesType>

const AddNewPostForm:React.FC<InjectedFormProps<LoginFormValuesType,PropsType> & PropsType> = (props) => {
    return (
        //@ts-ignore
        <form onSubmit={props.handleSubmit}>
            //@ts-ignore
            <div>
            //@ts-ignore
            { createField <AddPostFormValuesTypeKeys>('Email','newPostText',[required], Input) }
                           </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export type AddPostFormValuesType = {
    newPostText:string
}
//@ts-ignore
const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized