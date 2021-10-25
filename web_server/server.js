'use strict'

let http = require('http')
let https = require('https')
let fs = require('fs')

let express = require('express')
let serverIndex = require('serve-index')
const serveIndex = require('serve-index')

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
https_server.listen(443, '0.0.0.0')
