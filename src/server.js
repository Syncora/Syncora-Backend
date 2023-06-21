const socketIO = require('socket.io');
const socketConfig = require('./config/socketConfig');
require('dotenv').config();

const app = require('./app');

// Create HTTP server
const httpServer = require('http').createServer(app);

// Configure Socket.IO
const io = socketIO(httpServer);
socketConfig.configure(io);

// Get app environment status
const PORT = process.env.APP_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT;

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.APP_ENV} mode, listening on *:${PORT}`);
});

