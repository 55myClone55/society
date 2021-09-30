import { StatusType } from './../../API/chat-api';
//import { actions } from './users_reducer';
import { useDispatch } from 'react-redux';
import React, { Dispatch } from 'react'
import {ChatMessageType,chatAPI} from '../../API/chat-api'
import { message } from "antd";
import { InfernActionTypes,BaseThunkType } from './Redux-store';
import { FormAction, stopSubmit } from "redux-form";
import {v1} from 'uuid';
//import { v4 as uuidv4 } from 'uuid';

type ChatMessagesType = ChatMessageType & {id:string}

let initialState = {
    messages: [] as ChatMessagesType[],
    status: 'pending' as StatusType
   

};


const chatReduser = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEAVED':
                 
        return {
                ...state,
               messages: [...state.messages,...action.payload.messages.map(m => ({...m, id: v1() }))].filter((m, index, array)=> index >= array.length - 100)

            }
            case 'SN/chat/STATUS_CHANGED':
                 
        return {
                ...state,
              status: action.payload.status

            }
            default:
            return state;
    }

}

export const actions = {
    messagesReceived : (messages: ChatMessageType[] ) => ({
        type:'SN/chat/MESSAGES_RECEAVED', payload: {messages}
    } as const),
    statusChanged : (status: StatusType ) => ({
        type:'SN/chat/STATUS_CHANGED', payload: {status}
    } as const)
}



   


let _newMessageHandler: ((messages: ChatMessageType[]) =>void) | null = null
//@ts-ignore
const newMessageHandlerCreator = (dispatch: Dispatch) =>{
if(_newMessageHandler === null){
    _newMessageHandler = (messages) =>{
        dispatch(actions.messagesReceived(messages))
    }
}

return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) =>void) | null = null
//@ts-ignore
const statusChangedHandlerCreator = (dispatch: Dispatch) =>{
if(_statusChangedHandler === null){
    _statusChangedHandler = (status) =>{
        dispatch(actions.statusChanged(status))
    }
}

return _statusChangedHandler
}
export const startMessagesListening = ():ThunkType => async (dispatch) => {
    chatAPI.start()
    //@ts-ignore
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  //@ts-ignore
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = ():ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
    
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message:string):ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}



export type InitialStateType = typeof initialState

type ActionTypes = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export default chatReduser