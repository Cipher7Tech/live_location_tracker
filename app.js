const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;

// Set up view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Handle WebSocket connection
io.on("connection", function (socket) {
    socket.on("send-location",function(data){

        io.emit("receive-location",{id:socket.id, ...data});

    });
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })
});

// Render the homepage
app.get('/', function (req, res) {
    res.render("index");
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
