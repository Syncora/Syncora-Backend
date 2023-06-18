const http = require('http');
const socketIO = require('socket.io');
const socketConfig = require('./config/socketConfig');
require('dotenv').config();

const app = require('./app');

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO
const io = socketIO(server);
socketConfig.configure(io);

// Start the server
const port = process.env.PORT || 8080;
server.listen(port)
