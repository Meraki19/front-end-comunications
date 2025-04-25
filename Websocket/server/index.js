const express = require("express");
const useropn = require ('./user-operations')
const getOnlineUser = require('./online-user-details')
const userData = require('../mock_data/user-list.json')
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const port = 3002;
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname,'..')));
app.use(express.json());
app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname,'..', "login.html"));
});

let userList = {}; //username: socketId
app.get("/userList", (req, res) => {
  res.json(userList);
});
app.get("/loginUser", (req, res) => {
  
let user = userData.find((user)=> user.name===req.query.username)
  if (user) {
    res.send(true);
  } else {
    res.send(false);
  }
});
io.on("connection", (socket) => {
  console.log("connection established");
  socket.on("addSocketId", (username) => {
    userList[username] = socket.id;
    const onlinedata= getOnlineUser(userData,username)
  
   let onlinedetails = {
    user : onlinedata[0].name,
    userId: onlinedata[0].id,
    status:'online'
  }
    socket.broadcast.emit('onlineUser', onlinedetails)
    console.log(userList)
  });

  socket.on("chatMessage", (msgDetails) => {
    console.log('messaging systems')
    const { from,to, msg } = msgDetails;
    
    console.log(msgDetails);
    socket.to(userList[to]).emit("ServerEmit", {
      from:from,
      message: msg
    });
  });
});
app.get('/getContactList',(req, res)=>{
  const contactList =  userData.filter((user)=>user.name !== req.query.currentUser)
  res.json(contactList)
})
app.post("/signupUser", (req, res) => {
  useropn.addUser(req.body)
  res.send({
    isSuccess: true,
    message: "User signup successful",
  });
});

server.listen(port, () => {
  console.log(`listening to port ${port}`);
});
