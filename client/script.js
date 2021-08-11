let socket = io.connect(); //to define the socket

let message = document.getElementById('message');
let sendBtn = document.getElementById('send');
let keepBtn = document.getElementById('keep');
let targetArea = document.getElementById('messages');

socket.on("sendmsg",(message)=>{
    targetArea.innerHTML+=message+"<br>";
})

sendBtn.addEventListener("click",()=>{
 socket.emit("sendmsg",message.value); //send data to server
})

keepBtn.addEventListener("click",()=>{
    targetArea.innerHTML+=message.value+"<br>";
})