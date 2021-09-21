import React, { ChangeEvent,FC } from "react";
import Svg from "../../common/svg/Svg";
//import MyPosts from "./MyPosts/MyPosts";
//import Post from "./MyPosts/Post ";
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from './../../../aseets/user.jpg'
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";
import {ContactsType} from './../../../types/types'

type PropsType = {
    profile:PropsType | null
     status:string
      updateStatus:(status:string)=> void
       isOwner:boolean
        savePhoto:(file: File) => void
         saveProfile:(profile: ProfileType)=> Promise<any>
}

const ProfileInfo:React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Svg />
    }

    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData:ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })

    }
    //@ts-ignore
    return <div>
//@ts-ignore
        <div className={s.find}>
            <img src="data:image/jpeg;base64,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" alt="" />
        </div>
        <div className={s.discriptionBlock}>
            <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
//@ts-ignore
            {editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile}
                    isOwner={isOwner} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>


    </div>
}
type ProfileDataPropsType = {
    profile:ProfileType
     isOwner:boolean
      goToEditMode:()=> void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (<div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b> Full name</b>: {profile.fullName}
        </div>
        <div>
            <b> Looking for a job </b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b> My professional skills </b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me </b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object
            .keys(profile.contacts)
            .map((key) => {
                return <Contact key={key}
                    contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}
        </div>
    </div>
    )
}

type ContactsPropsType = {
    contactTitle:string
     contactValue:string
}
const Contact:React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo