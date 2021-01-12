const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
let countUserOnline =1
let countMessage = 0
io.on('connection', socket => {
    socket.on('join', param => {
        countMessage = 0
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        countMessage++;
        console.log('user mengirim pesan')
        io.emit('message', param)
        io.emit('countMessage', countMessage)
    })
    socket.on('disconnect', param => {
        countMessage--;
        console.log('user keluar')
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline)

    })
})
server.listen(3000)

console.log('Server is Running');