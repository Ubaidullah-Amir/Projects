const log=require("../logger")
const mongoose=require("mongoose")
const Message=require("../Schemas/message")



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
log("hlelo")
// create a msg 
async function createMsg(msg_obj) {
    try {
        log(msg_obj.to)
        log(msg_obj.from)
        log(msg_obj.text)
        const msg=await Message.create(msg_obj)
        log("Message created",msg.text)
        return msg
    } catch (e) {
        log(e)
    }
}
// find  a msg using msg_id
async function findMsg(msg_id) {
    try {
        const msg=await Message.findOne({_id:msg_id}).populate("to").populate("from").limit(1)
        log("Message",msg)
        return msg
    } catch (e) {
        log("error",e)
    }
    
}
// delete  a msg using msg_id
async function deleteMsg(msg_id) {
    try {
        const msg=await Message.deleteOne({_id:msg_id})
        log("MSG deleted",msg)
        return msg
    } catch (e) {
        log("error",e)
    }
    
}
module.exports={createMsg,findMsg,deleteMsg}





