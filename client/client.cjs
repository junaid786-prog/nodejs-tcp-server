const net = require("net")
const fs = require("fs")
const path = require("path")
const { encrypt } = require('../crypto')

let client = new net.Socket();

function connectToServer() {
    client.connect(8001, "localhost", () => {
        setTimeout(() => {
            writeData(client);
        }, 3000);
    })

    client.on("data", (data) => {
        console.log("Received data from server: " + data);
    })

    client.on("close", () => {
        console.log("closing connection");
        client.write("closing connection ...");
    })
}

function writeData(client) {
    fs.readFile(path.join(__dirname, '') + '/sample.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let encryptedData = encrypt(data)
        client.write(JSON.stringify(encryptedData));
    })
}


  
connectToServer()
