const express=require("express")
const log=require("../logger")
const router = express.Router()
const {findUserByEmailNPass,createUser,deleteUserById,finduserById, getAllUser}=require("../databaseUtils/user")


// get a user
router.get("/",(req,res)=>{
    try{
        // log("req.body",req.body)
        finduserById(req.body.id)
        .then(user=>{
            res.json({Success:true,user})
            
        })
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})


//post  for login
router.post("/login",(req,res)=>{
    try{
        // log("login")
        findUserByEmailNPass(req.body.email,req.body.password)
        .then(user=>{
            if(user){
                res.json({user:user,Success:true,Msg:"User found"})
                return 
            }
            res.status(400).json({user:user,Success:false,Msg:"User not found"})
             
            
        }).catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
    }catch(e){
        // log("login catch error",e)
        res.status(400).json({error:e.message,Success:false})
    }
})

//post for sign up
router.post("/signup",(req,res)=>{
    try{
        createUser(req.body)
        .then(user=>{
            // log("user final",user)
            if(user){
                res.json({user:user,Success:true,Msg:"New User Created"})
                return 
            }
            res.status(400).json({Success:false,Msg:"User Email already exist"})
        })
            
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})

//Get All Users
router.get("/getusers",(req,res)=>{
    try{
        getAllUser()
        .then(user=>{
            if(user){
                res.json({Success:true,Msg:"User found",user:user})
                return 
            }
            res.status(400).json({Success:false,Msg:"User not found",user:user})
             
            
        }).catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
    }catch(e){
        // log("login catch error",e)
        res.status(400).json({error:e.message,Success:false})
    }
})
// delete a user
router.delete("/delete",(req,res)=>{
    try{
        // log("req.body",req.body)
        deleteUserById(req.body.id)
        .then(status=>{
            if(status.deletedCount==1){
                res.json({Success:true,msg:"User deleted"})
            }else{
                throw new Error("No user deleted")
            }
        })
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})


module.exports=router