import { WebSocketServer,WebSocket } from 'ws';


const wss = new WebSocketServer({port : 9090});

let userCount = 0;
let allUser : WebSocket[] = []

wss.on("connection", (socket) => {
    allUser.push(socket)
    socket.on("message",(msg) => {
        allUser.forEach((user) => {
            user.send(msg.toString());
        })
    })
})