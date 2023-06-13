const dgram = require("dgram");
const fs = require("fs");
const path = require("path");
const { encrypt } = require('../crypto');

const client = dgram.createSocket("udp4");

function connectToServer() {
    fs.readFile(path.join(__dirname, '') + '/sample.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let encryptedData = encrypt("data")
        client.send(Buffer.from(JSON.stringify(encryptedData)), 8001, "localhost", (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

connectToServer();

client.on("message", (data, rinfo) => {
    console.log("Received data from server: " + data.toString());
    console.log("Server info: " + rinfo.address + " : " + rinfo.port);
});

client.on("error", (err) => {
    console.log("Error occured: " + err);
});

client.on("close", () => {
    console.log("UDP CLIENT CLOSED");
});
