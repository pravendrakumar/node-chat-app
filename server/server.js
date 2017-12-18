const express = require('express');
var app = express();
const path = require('path');
const http = require('http');
var socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
const  publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    // socket.emit('newMessage',{
    //     from:"mike@example.com",
    //     text:"Hey,How's going on there!",
    //     creaedAt:new Date().getTime()
    // });

    socket.on('createMessage',(message)=>{
        // io.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     creaedAt: new Date().getTime()
        // });

        //for broadcast message to everyone except the sender
        socket.broadcast.emit('createMessage',generateMessage(message.from,message.text))
        console.log('new message encounter at server',message);
    });

    socket.on('disconnect',()=>{
        console.log('Disconnect from the client!');
    });
});







server.listen(port,()=>{
    console.log(`Server up on port ${port}`);
})