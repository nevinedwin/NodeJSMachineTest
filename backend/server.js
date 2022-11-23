const http = require('http');
const mongoose = require('mongoose');
const router = require('./routes/index');


const PORT = 3000;


mongoose.connect("mongodb://localhost:27017/userDb").then(() => {
    console.log("Server Successfully connected to Database");
})

const server = http.createServer((req, res) => {
    router(req, res);
})

server.listen(PORT, () => {
    console.log(`Server listening to port:${PORT}`);
})