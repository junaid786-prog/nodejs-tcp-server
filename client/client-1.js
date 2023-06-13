const net = require("net");
const readLine = require("readline");
const fs = require("fs");
const path = require('path')

// establishing new socket
let socket = new net.Socket()

// connect to server
socket.connect(8002, "localhost", () => {
    console.log("connection established with server");
    readLineByLine();
})

// on receiving data from client
socket.on("data", (data) => {
    console.log(data.toString());
})

// on closing connection
socket.on("close", () => {
    console.log("Socket closed ... !");
})

// on facing error
socket.on("error", (err) => {
    console.log("Error Occured: " + err);
})

function readLineByLine() {
    let file = readLine.createInterface({
        input: fs.createReadStream(path.join(__dirname, '') + '/sample.txt'),
    })

    file.on("line", (line) => {
        socket.write(line + '\n');
    })

    file.on("close", ()=>{
        socket.write("file ended! ...");
    })
}
