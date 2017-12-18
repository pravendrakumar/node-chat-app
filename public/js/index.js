var socket = io();
socket.on('connect',function(){
    console.log('connected to server');
    // socket.emit('createMessage',{
    //     From:"test@example.com",
    //     text:"Hi,How are you"
    // });
});

//when server not connected
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('new message  is encounter',message);
});

// socket.on('newEmail',function(email){
//     console.log('new Email is encounter',email);
// });