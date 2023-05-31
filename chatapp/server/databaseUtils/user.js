const log=require("../logger")
const mongoose=require("mongoose")
const User=require("../Schemas/user")
const Request=require("../Schemas/request")
const { createChat } = require("./chat")
const { createRequest } = require("./request")
mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{log("connected")}).catch((e)=>{log(e)})


// const ubaid="64280fdf9d42825e5e2a108f"
// const umer="64280c50275327e9fe01e8d6"
// const msg_id="642812f0b23bc7909b785ff3"
// const chat_id="6428162fb0f6d126430c50b1"
// const message_obj={
//     to:umer,
//     from:ubaid,
//     text:"hello world"
// }

// const user_obj={
//     name:"ubaid",
//     email:"ubaid",
//     password:"ubaid",

// }



async function getAllUser() {
    try {
        const user =await User.find()
        log("user",user)
        return user
    } catch (e) {
        log("database error",e)
    }
    
}

async function finduserById(currentUser_id) {
    try {
        const user =await User.findOne({_id:currentUser_id}).populate("friend")
        return user
    } catch (e) {
        log("database error",e)
    }
    
}
async function findUserByEmailNPass(email,password) {
    try {
        const user =await User.findOne({email:email,password:password}).populate("friend")
        // log("user",user)
        return user
    } catch (e) {
        // log("database error",e.message)
    }
    
}
// friends
async function findFriendById(currentUser_id) {
    try {
        const friends = await User.find({_id:currentUser_id},"friend").populate("friend")
        // log("friends",friends)
        return friends
    } catch (e) {
        // log("database error",e)
    }
    
}
// adds friend to user's friend list 
// creates a chat document between user and the friend
async function addFriend(user_id,person_id) {
    const peopleIdArr=[user_id,person_id]
    try {
        const req =await Request.find({
            sender: {
                $in: peopleIdArr
            },
            reciever:{
                $in: peopleIdArr
            }
        }).populate("sender").populate("reciever")
        if(req.len >= 0){
            // there is already a request between these two 
            // or they are friends already 
            return true
        }
        const req_obj={
            sender:user_id,
            reciever:person_id,
            hasApproved:false
        }
        await createRequest(req_obj)
        // returning request found or not 
        return false
    } catch (e) {
        log("database error",e)
    }
    
}
async function deleteUserById(userId) {
    try {
        const status = await User.deleteOne({_id:userId})
        
        // log("delete status", status)
        return status
    } catch (e) {
        // log("database error",e)
    }
    
}

// only used in create User for uniquness of email
async function findUserByEmail(email) {
    try {
        const user =await User.findOne({email:email})
        // log("user in findUserByEmailNPass",user)
        return user
    } catch (e) {
        // log("database error",e.message)
    }
    
}
// used in sign up 
async function createUser(user_obj) {
    try {
        const person = await findUserByEmail(user_obj.email)
        log("person",person)
       
        if(!person){
            // if person is empty
            log("no user found")
            const user = await User.create(user_obj)
            
            return user
        }
        return null 
        
    } catch (e) {
        log("error",e)
    }
    
}
// createUser(user_obj)

module.exports={createUser,findUserByEmailNPass,deleteUserById,findFriendById,addFriend,finduserById,getAllUser}
