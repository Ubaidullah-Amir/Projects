import { Button } from "react-bootstrap";
import { useConversation } from "../../utils/reactQuery";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { UserContext } from "../Main";
const baseURL="http://localhost:3030"

function funcPostMsg(req_obj) {
    return axios.post(`${baseURL}/chat/add_msg`,req_obj)
}
function deleteConversation(id) {
    console.log("id",id)
    return axios.post(`${baseURL}/chat/deleteConversation`,id)
}
function ChatBox({user,selectedFriend}) {
    console.log("chatbox rerender")
    const {socket}=useContext(UserContext)
    const [ownMessages, setOwnMessages] = useState([])
    const [RecievedMessages, setRecievedMessages] = useState([])
   // msg input state
    const [inputValue,setInputValue]=useState("")
    // user currently typing 
    const [isTyping,setIsTyping]=useState(false)
    // msg send post request
    const {mutate}=useMutation({mutationFn:funcPostMsg,
        onSuccess:(data)=>{
          console.log("send successfully sent",data.data)
        },
        onError:(error)=>{
            console.log(" error in sending message",error)
        }
    })
    const {mutate:deleteChat}=useMutation({mutationFn:deleteConversation,
        onSuccess:(data)=>{
          console.log("conversation deleted",data.data)
        },
        onError:(error)=>{
            console.log(" error in deleting chat",error)
        }
    })
    function onSuccessUseConversation(){
        console.log("conversation fetched")
        setRecievedMessages([])
        setOwnMessages([])
    }
    const {isLoading,data,isError}=useConversation(user._id,selectedFriend._id,onSuccessUseConversation)
    
    useEffect(() => {
        const eventListener = (msg)=>{
            console.log("message recienved from client",msg)
            setRecievedMessages((prevState)=>([...prevState,msg]))
        }
        socket.on("recieve-message", eventListener);
    
        return () => socket.off("recieve-message", eventListener);
      }, [socket]);
      useEffect(() => {
        const eventListener = (typing)=>{
            setIsTyping((prevState)=>(typing))
        }
        socket.on("recieve-user-typing", eventListener);
        
        return () => socket.off("recieve-user-typing", eventListener);
      }, [socket]);

    useEffect(() => {
      if(isTyping){
        setTimeout(() => {
            setIsTyping(false)
        }, 2000);
      }
    }, [isTyping])
    
    if(isLoading){
        return <p>Loading</p>
    }
    if(isError){
        return <p>Unexpected Error occured</p>
    }
    return ( 
        <>
            <h3>{selectedFriend.name}{isTyping?<p>(typing)</p>:<></>}</h3>
            <Button onClick={()=>{
                if(!isLoading & !isError){
                    deleteChat(data.chat._id)
                }
                }}>Clear chat</Button>
            <div className="chat_box">
                    <MessageContainer RecievedMessages={RecievedMessages} ownMessages={ownMessages} messages={data.chat.conversation}/>
             

                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        
                        if(!isLoading & !isError){
                            const req_body={
                                chat_id:data.chat._id,
                                msg_obj:{
                                    to:selectedFriend._id,
                                    from:user._id,
                                    text:inputValue
                                }
                            }
                            mutate(req_body)
                            // websocket 
                            console.log("message sent from client")
                            socket.emit("send-message",req_body)
                        }
                        const msg_obj={
                            text:inputValue,
                            sent:true
                        }
                        setOwnMessages((pervState)=>([...pervState,msg_obj]))
                        // clear input bar
                        setInputValue("")
                    }} className="input_container">
                    <input value={inputValue} onChange={(e)=>{
                        setInputValue(e.target.value)
                        socket.emit("user-typing",true)
                        }} placeholder="message"/>
                    <Button type="submit"> Send</Button>
                    </form>
            </div>
        </>
     );
}


function MessageContainer({messages,RecievedMessages,ownMessages}) {
    const RecivedMsgIdArr=RecievedMessages?.map((msg)=>msg._id)
    const mainMessagesArr=messages?.filter(msg => {
        if(RecivedMsgIdArr.includes(msg._id)){
            return false
        }else{
            return true
        }
    });
    const {user}=useContext(UserContext)
    const scrollDiv=useRef()
{/* {
                "_id": "642ec20d2164b4db90193a33",
                "text": "hello NEw world",
                "from": "64280fdf9d42825e5e2a108f",
                "to": "64280c50275327e9fe01e8d6",
                "createdAt": "2023-04-06T12:58:14.607Z",
                "__v": 0
            }, */}
    function scrollBottom(){
        if(!scrollDiv.current){
            return
        }
        scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
    }
    return ( <><div ref={scrollDiv} className="message_container">
    {/* {messages.map((msg)=>{
        if(msg.from===user._id){
            // user send message
            return <Message key={msg._id} text={msg.text} sent={true}/>
        }
        return <Message key={msg._id} text={msg.text} sent={false}/>
    })
    }
    {
        RecievedMessages?.map((msg)=>{
            return <Message key={msg._id} text={msg.text} sent={false}/>
        })
    } */}
    {mainMessagesArr.map((msg)=>{
        if(msg.from===user._id){
            // user send message
            return <Message key={msg._id} text={msg.text} sent={true}/>
        }
        return <Message key={msg._id} text={msg.text} sent={false}/>
    })
    }
    {
        RecievedMessages?.map((msg)=>{
            console.log("from socket",msg.text)
            return <Message key={msg._id} text={msg.text} sent={false}/>
        })
    }
    {
        ownMessages.map((msg,index)=>{
            return <Message key={index} text={msg.text} sent={msg.sent}/>
        })
    }

    
    </div>
    {scrollBottom()}
    </> );
}

function Message({text,sent}) {
    return ( <p className={sent?"send":"recived"}>{text}</p> );
}

export default ChatBox;