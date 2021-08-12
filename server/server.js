const express = require('express');
const http = require('http');

const app = express(); //To define our application

const clientPath = `${__dirname}/../client`; //To give the path to our client
app.use(express.static(clientPath));//To use express to host the client
const server = http.createServer(app); // To use http to serve the app that express provides

server.listen(8080, () =>{
    console.log("server running on "+ 8080);
}); // To get the server live


const io = require('socket.io')(server); //To require socket.io

let counter = 0;

io.on('connection', (socket) => {
    console.log(counter+' someone connected');
    counter++;

    io.emit('usercnt',counter); //io.emit sends data to all clients. Catch it on client with "usercnt"
    socket.on('disconnect',()=>{
        counter--;
        console.log('a user disconnected, and now '+ counter+' ppl connected');
        io.emit('usercnt',counter);
    });

    //This is an observer that waits until the message "sendToAll" gets passed to the server.
    socket.on("sendToAll",(message)=>{
        // the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter.
        io.emit("displayMessage",(message));
    });

    socket.on("sendToMe",(message)=>{
        socket.emit("displayMessage",(message));
    });


    socket.on("/",(req,res)=>{
        res.sendFile(__dirname+"/client/index.html"); //on the server will catch emit and send message to all clients
    });

});