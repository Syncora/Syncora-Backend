function configure(io) {
    io.on('connection', (socket) => {
        console.log('A client connected');

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });
};

module.exports = {
    configure,
};