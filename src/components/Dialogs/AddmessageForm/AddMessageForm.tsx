import React,{FC} from 'react';
//@ts-ignore
import {createField} from '../../common/FormsControls/FormsControls'
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../utils/validator/validators"
import {InjectedFormProps} from 'redux-form'
//@ts-ignore
import { Textarea } from "../../common/FormsControls/FormsControls"
import { NewMessageFormType } from '../Dialogs';

const maxLength50 = maxLengthCreator(50)
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormType,PropsType> & PropsType> = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <div>
            { createField <NewMessageFormValuesKeysType>('your message','newMessageBody',
            [required, maxLength50], Textarea) }
                <Field component={Textarea}
                    validate={[required, maxLength50]}
                    name='newMessageBody' placeholder='your message' />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

export default reduxForm<NewMessageFormType>({ form: 'dialog-add-message-form' })(AddMessageForm)

