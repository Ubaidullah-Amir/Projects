import { useNavigate } from "react-router-dom";
import { useRequests, useUsers } from "../utils/reactQuery";
import { useContext, useEffect } from "react";
import { UserContext } from "./Main";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import axios from "axios";

const baseURL="http://localhost:3030"
function funcRequestAcceptor(req_obj) {
    return axios.post(`${baseURL}/request/requestapproved`,req_obj)
}

function Requests() {
    // navigate if not logged in 
    const {user,setUser}=useContext(UserContext)
    
    const Navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            Navigate("/login")
        }
    },[])
    // add friend mutation
    const {mutate}=useMutation({mutationFn:funcRequestAcceptor,
        onSuccess:(data)=>{
            console.log("Friend added successfully",data.data)
            setUser(data.data.user)
        },
        onError:(error)=>{
            console.log("Error in adding friend",error)
        }
    })
    console.log("user",user)
    
    // get user logic
    const {isLoading,data,isError}=useRequests(user?._id)
    if(isLoading){
        return <p>Loading</p>
    }
    if(isError){
        return <p>Unexpected Error occured</p>
    }
    if(!user){
        return <></>
    }
    console.log("data request",data)
    return ( 
        <>
        <h1>Requests from people</h1>
        {data.request.map((item)=>{
            // const friendArr=user.friend.map((friend)=>(friend._id))
            // if(item._id===user._id || friendArr.includes(item._id)){
            //     return 
            // }
            // return <User user_id={user._id} mutate={mutate} key={item._id} friend_id={item._id} name={item.name}/>
            return <Request user_id={user._id} mutate={mutate} key={item._id} friend_id={item.sender._id} name={item.sender.name}/>
            // Sender => friend
            // reciever => user 
            })}
        </>
     );
     
}
function Request({name,friend_id,mutate,user_id}) {
    const req_obj={
        currentUser_id:user_id,
        friend_id:friend_id
    }
    return (
    <div>
        <p>Name :{name}</p>
        <Button onClick={()=>{mutate(req_obj)}}>Accept</Button>
    </div>)
    
}

export default Requests;