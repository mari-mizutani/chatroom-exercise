let socket = io.connect(); //to define the socket

let message = document.getElementById('message');
let name = document.getElementById("username");
let sendBtn = document.getElementById('send');
let keepBtn = document.getElementById('keep');
let targetArea = document.getElementById('messages');
let showCounter = document.getElementById("counter");
let memberList = document.getElementById("member");


// Counter on the screen
socket.on("usercnt", counter => {
    showCounter.innerHTML=counter;
});

//send data to server
sendBtn.addEventListener("click",()=>{
 socket.emit("sendToAll",{
     name:username.value,
     message:message.value
    }); 
});

//send data to yourself
keepBtn.addEventListener("click",()=>{
    socket.emit("sendToMe",{
        name:username.value,
        message:message.value
       }); 
});

//catch the name and message which server sends on client
socket.on("displayMessage", data =>{ 
    targetArea.innerHTML+="<strong class='text-info'>" + data.name + ": </strong>" + data.message + "<br>";

    let list = document.createElement("li"); 
    list.innerHTML = data.name;

    memberList.appendChild(list);
});