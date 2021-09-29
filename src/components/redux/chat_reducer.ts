import { useDispatch } from 'react-redux';
import React, { Dispatch } from 'react'
import {ChatMessageType,chatAPI} from '../../API/chat-api'
import { message } from "antd";
import { InfernActionTypes,BaseThunkType } from './Redux-store';
import { FormAction, stopSubmit } from "redux-form";

let initialState = {
    messages: [] as ChatMessageType[]
   

};


const chatReduser = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEAVED':
                 
        return {
                ...state,
               messages: [...state.messages,...action.payload.messages]

            }
            default:
            return state;
    }

}

export const actions = {
    messagesReceived : (messages: ChatMessageType[] ) => ({
        type:'SN/chat/MESSAGES_RECEAVED', payload: {messages}
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
export const startMessagesListening = ():ThunkType => async (dispatch) => {
    chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = ():ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message:string):ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}



export type InitialStateType = typeof initialState

type ActionTypes = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export default chatReduser