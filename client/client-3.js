const net = require('net');
const fs = require('fs');

const client = new net.Socket();

client.connect(5000, '127.0.0.1', () => {
    console.log('Connected to server');

    let fileName = "sample.txt";
    client.write(fileName);
});

client.on('data', (data) => {
    fs.writeFile("fileName.txt", data, (err) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            return;
        }

        console.log(`File  received from server`);
        client.end();
    });
});

client.on('end', () => {
    console.log('Disconnected from server');
});
