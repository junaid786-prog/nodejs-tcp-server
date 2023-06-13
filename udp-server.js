const dgram = require("dgram");
const { decrypt } = require('./crypto');

const server = dgram.createSocket("udp4");

server.bind(8001, "localhost", () => {
    console.log("UDP SERVER IS LISTENING ON PORT 8001");
});

server.on("message", (data, rinfo) => {
    console.log("client info: " + `address: ${rinfo.address} : ${rinfo.port}`)
    console.log("From client: " + data);
    let decryptedData = decrypt(data);
    server.send(Buffer.from("Your sent data is: " + decryptedData), rinfo.port, rinfo.address);
});

server.on("error", (err) => {
    console.log("Error occured: " + err);
});

server.on("close", () => {
    console.log("UDP SERVER CLOSED");
});
