const express = require('express');
const http = require('http');

const app = express(); //To define our application

const clientPath = `${__dirname}/../client`; //To give the path to our client
app.use(express.static(clientPath));//To use express to host the client
const server = http.createServer(app); // To use http to serve the app that express provides

app.get("/",(req,res)=>{
    res.send("Hello world");
});

server.listen(8080, () =>{
    console.log("server running on "+ 8080);
}); // To get the server live