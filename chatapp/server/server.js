const log=require("./logger")
const userRouter=require("./routes/user")
const friendRouter=require("./routes/friends")
const chatRouter=require("./routes/chat")
const msgRouter=require("./routes/message")
const reqRouter=require("./routes/request")
const cors = require('cors')
const port=3030

const express=require("express")
const app =express()

const http = require('http');
const { createMsg } = require("./databaseUtils/message")
const server = http.createServer(app);

// websocket fix this later
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
// testing
io.on('connection', (socket) => {
    socket.on("send-message",(data)=>{
        createMsg(data.msg_obj)
        .then((msg)=>{
          
          socket.broadcast.emit("recieve-message",msg)})
          
        .catch((e)=>{console.log("message not created or send",e.message)})
        
    })
    socket.on("user-typing",(data)=>{
      console.log("someone is typing",data)
      socket.broadcast.emit("recieve-user-typing",data)
    })
    
    // socket.on("user-typing",(data)=>{
    //   console.log("someone is typing",data)
    //   socket.broadcast.emit("recieve-user-typing",data)
    // })
          
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

app.use(cors())
// Router for user
// enable exio,fetch json  body in req object
app.use(express.json())
// enable form body in req object
app.use(express.urlencoded({extended:false}))






app.use("/user",userRouter)
app.use("/friends",friendRouter)
app.use("/chat",chatRouter)
app.use("/msg",msgRouter)
app.use("/request",reqRouter)
//  static file : public folder
app.use(express.static("public"))



app.get("/",(req,res)=>{
    res.send("Hello World")
})

// app.listen(port,()=>{
//     log("connected")
// })

// new code
server.listen(port, function() {
    console.log('listening on *:3030');
 });

 module.exports=http