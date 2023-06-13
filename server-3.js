const net = require('net');
const fs = require('fs');
const path = require("path")
const server = net.createServer((socket) => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    socket.on('data', (data) => {
        let fileName = data.toString().trim();

        fs.readFile(path.join(__dirname, 'client') + '/sample.txt', (err, content) => {
            if (err) {
                socket.write(`Error: ${err.message}`);
                return;
            }

            socket.write(content);
            socket.end();
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});
