import { InfernActionTypes } from './Redux-store';



type DialogType = {
    id:number
    name: string
}

type MessageType = {
    id:number
    message: string
}

let initialState = {

    dialogs: [
        { id: 1, name: 'Kent' },
        { id: 2, name: 'Brat' },
        { id: 3, name: 'Marat' },
        { id: 4, name: 'Yaya' },
        { id: 5, name: 'Malena' },
        { id: 6, name: 'Drunya' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'Mahai' },
        { id: 3, message: 'Zaryazai' },
        { id: 4, message: 'Za' },
        { id: 5, message: 'Zay' }

    ] as Array<MessageType>
}





const dialogsReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            };

        default:
            return state;
    }


}



export const actions = {
    sendMessage : (newMessageBody:string) => 
    ({ type:'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}



export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InfernActionTypes<typeof actions>