const express=require("express")
const log=require("../logger")
const router = express.Router()
const {findFriendById,addFriend}=require("../databaseUtils/user")


// get friends of a user
// example
// [
//     {
//    ubaid id =>   _id: new ObjectId("64280fdf9d42825e5e2a108f"),
//       friend: [ [Object] ]
//     }
//   ]
router.post("/",(req,res)=>{
    try{
        log("req.body",req.body)
        findFriendById(req.body.id)
        .then(friends=>{
            res.json({Success:true,friends:friends})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})

// request object created with between populated with user and friend's id
router.post("/addfriend",(req,res)=>{
    // remove front end note : setting user after this reqeust 
    try{
        log("req.body",req.body)
        const currentUser_id=req.body.currentUser_id
        const friend_id=req.body.friend_id
        
        addFriend(currentUser_id,friend_id)
        .then(req_found=>{
            res.json({req_found:req_found,Success:!req_found})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
module.exports=router