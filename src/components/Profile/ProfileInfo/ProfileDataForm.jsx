import React from "react"
import s from './ProfileInfo.module.css';
import { createField, Input, Textarea } from './../../common/FormsControls/FormsControls'
import { Field, reduxForm } from "redux-form"

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (<form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div>
            {error}
        </div>
        }
        <div>
            <b> Full name</b>: {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b> Looking for a job </b>: {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>

        <div>
            <b> My professional skills </b>:
            {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>

        <div>
            <b>About me </b>:
            {createField('About me', 'aboutMe', [], Textarea)}
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

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm