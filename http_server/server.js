'use strict'

let http = require('http')
let app = http.createServer((req, res) => {
  console.log("http request!!!")
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end("Hello World\n")
}).listen(8080)
console.log("server已启动: 8080")