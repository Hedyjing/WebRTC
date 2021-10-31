'use strict'

let http = require('http')
let https = require('https')
let fs = require('fs')

let express = require('express')
let serverIndex = require('serve-index')
const serveIndex = require('serve-index')

// socket.io
let socketIo = require('socket.io')

// log
let log4js = require('log4js')

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'app.log',
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug'
    }
  }
})
let logger = log4js.getLogger()

let app = express()
app.use(serveIndex('./public'))  // 浏览目录
app.use(express.static('./public')) // 发布路径

// http server
let http_server = http.createServer(app)
http_server.listen(80, '0.0.0.0')

// https server
let options = {
  key: fs.readFileSync('./cert/hedyu.xyz.key'),
  cert: fs.readFileSync('./cert/hedyu.xyz.pem')
}
let https_server = https.createServer(options, app)

// bind socket.io with https_server
let io = socketIo.listen(https_server)

// connection
io.socketIo.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room)
    let myRoom = io.sockets.adapter.rooms[room]
    let users =  Object.keys(myRoom.sockets).length
    logger.log('the number of user in room is: ' + users)
    // socket.emit('joined', room, socket.id) // 给自己
    // socket.to(room).emit('joined', room, socket.id) // 除自己外房间所有人
    // io.in(room).emit('joined', room, socket.id) //房间内所有人
    socket.broadcast.emit('joined', room, socket.id)
  })

  socket.on('leave', (room) => {
    let myRoom = io.sockets.adapter.rooms[room]
    let users = Object.keys(myRoom.sockets).length

    logger.log('the number of user in room is: ' + users - 1)

    socket.leave(room)
    // socket.emit('joined', room, socket.id) // 给自己
    // socket.to(room).emit('joined', room, socket.id) // 除自己外房间所有人
    // io.in(room).emit('joined', room, socket.id) //房间内所有人
    socket.broadcast.emit('joined', room, socket.id)
  })
})

https_server.listen(443, '0.0.0.0')

console.log('服务已经启动： https://49.235.110.63')