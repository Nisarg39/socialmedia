const { Server } = require("socket.io");
const jwt = require('jsonwebtoken')
const socketFunctions = require('../config/socketHelper/socketFunctions')

let user = []
module.exports.socketActions = function(httpServer){
    const io = new Server(httpServer, { 
        cors: { 
            origin: process.env.CLIENT_URL,
            methods: ["GET","POST","PUT", "PATCH", "DELETE"]
        } 
    });

    io.on('connection', function(socket){
        // user.push(socket.id)
        // console.log('A user connected', socket.id);
        
        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
        //    console.log('A user disconnected');
        });

        socket.once('join_room', function(data){
            // console.log(data)
            socket.join(`${data.userId}`)
        })

        socket.on('notify_user', function(data){
            // console.log(data)

            switch(data.type){

                case "notification":
                    socketFunctions.addNotification(data)

                    socket.to(`${data.to}`).emit("notification", {
                        name: data.from,
                        senderId: data.senderId,
                        message: data.message
                    });
                    break;
            }
            
            // socket.emit()
        })

        socket.on('authenticatedUser', function(data){
            // console.log(data)
            var decoded = jwt.verify(data.token.substring(7,data.token.length), 'secretkey');  // decoding jwt key passed from socket client i.e from next js

        })
     });
}