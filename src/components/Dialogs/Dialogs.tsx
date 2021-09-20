import React,{FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import AddMessageForm from './AddmessageForm/AddMessageForm';
import { InitialStateType } from '../redux/Dialogs_reducer ';

type PropsType = {
    dialogsPage:InitialStateType
    sendMessage:(messageText:string)=> void
}

export type NewMessageFormType = {
    newMessageBody:string 
    
}


const Dialogs:React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => < DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagessElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
        let addNewMessage = (values:NewMessageFormType) => {props.sendMessage(values.newMessageBody)}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagessElements}</div>

            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}


export default Dialogs;