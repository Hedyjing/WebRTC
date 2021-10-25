"use strict"

let https = require('https')
let fs = require('fs')

let options = {
  key: fs.readFileSync('./cert/hedyu.xyz.key'),
  cert: fs.readFileSync('./cert/hedyu.xyz.pem')
}

let app  = https.createServer(options,(req, res) => {
  console.log("request!!!")
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end("Hello Wrold!\n")
}).listen(443, "0.0.0.0")

console.log('https服务已启动: 443')