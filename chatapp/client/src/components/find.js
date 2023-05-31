import { useNavigate } from "react-router-dom";
import { useUsers } from "../utils/reactQuery";
import { useContext, useEffect } from "react";
import { UserContext } from "./Main";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import axios from "axios";

const baseURL="http://localhost:3030"
function funcAddFriend(req_obj) {
    return axios.post(`${baseURL}/friends/addfriend`,req_obj)
}

function FindPeople() {
    // navigate if not logged in 
    const {user}=useContext(UserContext)
    
    const Navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            Navigate("/login")
        }
    },[])
    // add friend mutation
    const {mutate}=useMutation({mutationFn:funcAddFriend,
        onSuccess:(data)=>{
            console.log("Request successfully made",data.data)
        },
        onError:(error)=>{
            console.log("Error in requesting friend",error)
        }
    })
    console.log("user",user)
    
    // get user logic
    const {isLoading,data,isError}=useUsers()
    if(isLoading){
        return <p>Loading</p>
    }
    if(isError){
        return <p>Unexpected Error occured</p>
    }
    if(!user){
        return <></>
    }
    return ( 
        <>
        <h1>find people</h1>
        {data.user?.map((item)=>{
            const friendArr=user.friend.map((friend)=>(friend._id))
            if(item._id===user._id || friendArr.includes(item._id)){
                return 
            }
            return <User user_id={user._id} mutate={mutate} key={item._id} friend_id={item._id} name={item.name}/>

            })}
        </>
     );
     
}
function User({name,friend_id,mutate,user_id}) {
    const req_obj={
        currentUser_id:user_id,
        friend_id:friend_id
    }
    return (
    <div>
        <p>Name :{name}</p>
        <Button onClick={()=>{mutate(req_obj)}}>Add Friend</Button>
    </div>)
    
}

export default FindPeople;