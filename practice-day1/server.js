const {add,sub} = require('./calculator')

const http = require('http')

const server = http.createServer((req,res)=>{

    if(req.url === "/") res.end("Welcome HOme")
    else if(req.url==="/about") res.end("About Page")
    else res.end("404 - Page not found")

})

server.listen(5000,()=>{
    console.log('server running on 5000')
})