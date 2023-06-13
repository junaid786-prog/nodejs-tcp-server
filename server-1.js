const net = require("net")

let server = net.createServer();

// listen on port 8002
server.listen(8002, "localhost", ()=>{
    console.log("Server is listening on 8002");
})

// on request from client to establish connection
server.on("connection", (socket)=>{
    console.log("Socket is connected!.....");
    
    // on receiving data from client
    socket.on("data", (data) => {
        console.log(data.toString() + '\n');
        socket.write("Line received");
    })

    // on closing connection
    socket.on("close", ()=>{
        console.log("Connection closing!...");
    })

    // on error
    socket.on("error", () => {
        console.log("Error occured! .....");
    })
})