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
    var li = jQuery('<li></li>');
        li.text(`${message.from} : ${message.text}`);

        jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'John',
//     text:'Hi'
// },function(data){
//     console.log('Got it',data);
// });

// socket.on('newEmail',function(email){
//     console.log('new Email is encounter',email);
// });

$('#node-chat-app').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        'from':'User_'+new Date().getTime(),
        'text':$('[name=message]').val()
    },function(data){
        console.log('Got it',data);
    });
});