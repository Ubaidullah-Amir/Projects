const log=require("../logger")
const mongoose=require("mongoose")
const Chat=require("../Schemas/chat")
const { createMsg } = require("./message")



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



// findding chat using chat_id
// not used
async function findchatByID(chat_id) {
    try {
        // .populate("people").populate("conversation")
        const chat=await Chat.find({_id:chat_id}).populate("people").populate("conversation")
        log("chat",chat)
        return chat
    } catch (e) {
        // log("error",e)
    }
    
}
// finding chat using user and friend 's id
async function findchat(user_id,friend_id) {
    const ids=[friend_id,user_id]
    try {
        const chat=await Chat.findOne({people:{$in: ids}}).populate("people").populate("conversation")
        // log("chat",chat)
        return chat
    } catch (e) {
        // log("error",e)
    }
    
}

// add msg to chat's conversation
async function addMsgToChat(chat_id,msg_obj) {
    try {
        const msg=await createMsg(msg_obj)
        // log("msg is :",msg)
        const chat = await Chat.updateOne({_id:chat_id},{$push:{conversation:msg.id}})
        // log("Message added",chat)
    } catch (e) {
        // log(e)
    }
    
}
// delete a chat using id
async function deletechat(chat_id) {
    try {
        const chat=await Chat.find({_id:chat_id})
        log("conversation to delete",chat)
        chat.conversation=[]
        await chat.save()
        const newChat=await Chat.findOne({_id:chat_id})
        log("chat after update",newChat)
        return newChat
    } catch (e) {
        // log(e)
    }
    
}

async function createChat(Chat_obj) {
    try {
        const chat = await Chat.create(Chat_obj)
        // log("Chat",chat)
        return chat
    } catch (e) {
        // log("error",e)
    }
    
}
module.exports={findchat,findchatByID,addMsgToChat,deletechat,createChat}

