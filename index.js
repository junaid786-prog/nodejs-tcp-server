const net = require("net");
const { decrypt } = require('./crypto')


const server = net.createServer();

server.listen(8001, "localhost", () => {
    console.log("TCP SERVER IS LISTENING ON PORT 8001");
    console.log(server.address());
});

server.on("connection", (socket) => {
    console.log("socket is established from: " + socket.remoteAddress);
    socket.write("Hello From Server");

    socket.on("data", (data) => {
        let decryptedData = decrypt(data);
        console.log("From client: " + data);
        socket.write("Your sent data is: " + decryptedData);
    });

    socket.on("error", (err) => {
        console.log("Error occured: " + err);
    });

    socket.on("close", () => {
        console.log("Client wants to leave");
        socket.write("Server is leaving");
    });
});

server.on("close", () => {
    console.log("TCP SERVER CLOSED");
});


