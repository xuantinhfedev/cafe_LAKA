require('dotenv').config();
const http = require('http');
const app = require('./index')
const jwt = require('jsonwebtoken')
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log('port: ', process.env.PORT);
});

const JWT_SECRET = 'myRandomHash';

const io = require("socket.io")(server, {
    cors: {
        origins: [
            "http://localhost:3001",
            "http://localhost:4200",
            "http://localhost:8080"
        ],
        credentials: true
    },
});

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.use(async (socket, next) => {
    // fetch token from handshake auth sent by FE
    const token = socket.handshake.auth.token;
    try {

        // verify jwt token and get user data
        const user = await jwt.decode(token);
        console.log('user', user.name);
        // save the user data into socket object, to be used further
        socket.user = user;
        next();
    } catch (e) {
        // if token is invalid, close connection
        console.log('error', e.message);
        return next(new Error(e.message));
    }
});

io.on('connection', (socket) => {
    // join user's own room
    socket.join(socket.user.id);
    socket.join('myRandomChatRoomId');
    // find user's all channels from the database and call join event on all of them.
    console.log(`${socket.user.name} connected`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on('message', ({ message, roomName }, callback) => {
        console.log('message: ' + message + ' in ' + roomName);

        // generate data to send to receivers
        const outgoingMessage = {
            name: socket.user.name,
            id: socket.user.id,
            message,
        };
        // send socket to all in room except sender
        socket.to(roomName).emit("message", outgoingMessage);
        callback({
            status: "ok"
        });
        // send to all including sender
        // io.to(roomName).emit('message', message);
    })
});
