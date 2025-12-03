// non-blocking I/O

// const fs= require('fs')

// console.log('start')

// fs.readFile("sample.txt","utf-8",(err,data)=>{
//     console.log("file reading finished")
// })

// console.log("end of")


// //blocking I/O
// const fs = require('fs')

// console.log('start')

// const res = fs.readFileSync("sample.txt","utf-8")
// console.log(res)

// console.log('end')

// // common js examples
// function add(a,b){
//     return a+b
// }
// module.exports = add

// // common js imports
// const add = require("./math")
// console.log(add(6,3))



// // common js multiple exports

// function add(a,b){
//     return a+b
// }
// function sub(a,b){
//     return a-b
// }

// module.exports = {add,sub}

// // common js multiple imports
// const {add,sub} = require('./math')


// Basic Node.js HTTP Server

// const http = require('http')
// const server = http.createServer((req,res)=>{ 
//         //createServer() -> creates server, req -> incoming request, res -> what server sends back
//      res.writeHead(200,{"Content-Type":"text/plain"})
//     res.end("Hello from NOde server")
// })

// // server.listen() -> start server
// server.listen(5000,()=>{
//     console.log('server running on port 5000')
// })


// // call stack execution
// console.log("start")
// function greet() {console.log('hello')}
// greet()
// console.log("end")

// // what exactly happens when node handle async task

// console.log("start")
// setTimeout(() => {
//     console.log("timer function")
// }, 2000);
// console.log("end")

// 1. "start" logged -> call stack
// 2. setTimeout() -> handed to Node API
// 3. Node API starts timer
// 4. "end" logged -> call stack
// 5. after 2 sec -> callback moved to callback queue
// 6. event loop checks:is call stack empty?
// 7. moves callback -> call stack
// 8. logs "timer finished"