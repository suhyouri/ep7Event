const SerialPort = require('serialport')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const three = require('three')

const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})

const Readline = require('@serialport/parser-readline')
const parser = port.pipe(new Readline())//\r\n

app.use(express.static(__dirname + "/"))

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html")
});

io.on('connection', (socket) => {
    console.log('a user connected')
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

port.on('open',function() {
    console.log('port opened')
  })

parser.on('data', function(value) {
    console.log(value)
    io.emit("colorValue", value);
  })
