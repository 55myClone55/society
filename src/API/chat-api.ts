//import { StatusType } from './chat-api';
import { submit } from "redux-form";

const subscribers = {
    'messages-received': [] as SubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}  

let ws:WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = ()=>{
    notifySnbscribersAboutStatus('pending')
setTimeout( createChannel, 3000)
}
const messageHandler = (e: MessageEvent)=>{
   const newMessages = JSON.parse(e.data)
   subscribers['messages-received'].forEach(s => s(newMessages))
   } 
   const openHandler = ()=>{
      notifySnbscribersAboutStatus('ready')
    }
    const errorHandler = ()=>{
        notifySnbscribersAboutStatus('error')
        console.log('error')
      }

const cleanUp = () =>{
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message',messageHandler )
    ws?.removeEventListener('open',openHandler )
    ws?.removeEventListener('error', errorHandler)
}

const notifySnbscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s('pending'))
}

function createChannel(){
    cleanUp()
       ws?.close()
        ws = (new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
        notifySnbscribersAboutStatus('pending')
        ws.addEventListener('close', closeHandler)
        ws.addEventListener('message', messageHandler)
        ws.addEventListener('open',openHandler )
        ws.addEventListener('error', errorHandler)
        
  }

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
subscribeOnNewMess(eventName: EventsNamesType, callback:SubscriberType | StatusChangedSubscriberType){
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
        //@ts-ignore
subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
},
unsubscribe(eventName: EventsNamesType,callback:SubscriberType | StatusChangedSubscriberType){
     //@ts-ignore
subscribers = subscribers.filter(s => s !== callback)
},
sendMessage(message: string){
    ws?.send(message)
}
}
type SubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'