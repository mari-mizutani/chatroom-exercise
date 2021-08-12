let socket = io.connect(); //to define the socket

let message = document.getElementById('message');
let sendBtn = document.getElementById('send');
let keepBtn = document.getElementById('keep');
let targetArea = document.getElementById('messages');
let showCounter = document.getElementById("counter");

socket.on("displayMessage",(message)=>{ //catch the message which server sends on client
    targetArea.innerHTML+=message+"<br>";
});

sendBtn.addEventListener("click",()=>{
 socket.emit("sendToAll",message.value); //send data to server
});

keepBtn.addEventListener("click",()=>{
    socket.emit("sendToMe",message.value); //send data to yourself
});


// Counter on the screen
socket.on("usercnt", (counter) => {
    showCounter.innerHTML=counter;
});
