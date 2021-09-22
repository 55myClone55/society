import React,{FC} from "react"
import s from './ProfileInfo.module.css';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls'
import { Field, reduxForm,InjectedFormProps } from "redux-form"
import { GetStryngKeys } from "./../../common/FormsControls/FormsControls"
import { ProfileType } from "../../../types/types";

type PropsType = {
    handleSubmit:any
     profile:ProfileType
      error:any
}
type ProfileTypeKeys = GetStryngKeys<ProfileType>
//@ts-ignore
let ProfileDataForm:React.FC<React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType>> = ({ handleSubmit, profile, error }) => {
    return (<form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div>
            {error}
        </div>
        }
        <div>
            <b> Full name</b>: {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b> Looking for a job </b>: {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>

        <div>
            <b> My professional skills </b>:
            {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>

        <div>
            <b>About me </b>:
            {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div className={s.contact}>
                    <b>{key}:{createField(key, 'contact.' + key, [], Input)}</b>
                </div>
            })}
        </div>
    </form>
    )
}
//@ts-ignore
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm