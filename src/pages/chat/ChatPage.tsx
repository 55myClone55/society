import React,{useEffect, useState,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageType } from '../../API/chat-api';
import { startMessagesListening,stopMessagesListening,sendMessage } from '../../components/redux/chat_reducer';
import { AppStateType } from '../../components/redux/Redux-store';


 const ChatPage:React.FC = () =>{
return<div>
    <Chat/>
</div>
}

const Chat:React.FC = () =>{

const dispatch = useDispatch()

const status = useSelector((state: AppStateType)=> state.chat.status)

   useEffect(() => {
    dispatch(startMessagesListening())
    return ()=>{
        dispatch(stopMessagesListening())
    }
   }, [])

    return <div>
        {status === 'error' && <div>Error</div> } 
        <>
        <Messages />
        <AddMessageForm />
        </>
    
    </div>
}
const Messages:React.FC<{ }> = ( {}) =>{
    const  messages = useSelector((state:AppStateType) => state.chat.messages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAvtoScroll, setIsAvtoScroll] = useState(false)
const scrollHandler = (e: React.UIEvent<HTMLDivElement,UIEvent>) =>{
const element = e.currentTarget
if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) <300)
{
    !isAvtoScroll && setIsAvtoScroll(true)
}else{
    isAvtoScroll && setIsAvtoScroll(false)
}
}

    useEffect(() => {
        if(isAvtoScroll){
        messageAnchorRef.current?.scrollIntoView({behavior:'smooth'})
        }
    }, [messages])
    return <div style={{height: '400px', overflowY:'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
       <div ref={messageAnchorRef}></div>
    </div>
}

const Message:React.FC<{message: ChatMessageType}> = React.memo(({message}) =>{
      return <div>
       <img src={message.photo} style={{width:'30px'}}/><b>{message.userName}</b>
       <br/>
       {message.message}
       <hr />
    </div>
})

const AddMessageForm:React.FC<{ }> = () =>{
const [message, setMessage] =  useState('')
const dispatch = useDispatch()
const status = useSelector((state: AppStateType)=> state.chat.status)

const sendMessageHandler = () =>{
    if(!message){
        return
    }
    dispatch(sendMessage(message))
    setMessage("")
}

    return <div>
        
        <div>
       <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}></textarea>
       </div>
       <div>
       <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
       </div>
    </div>
}

export default ChatPage