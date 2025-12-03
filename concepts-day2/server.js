// const http = require('http')
// require('dotenv').config()

// const server = http.createServer((req,res)=>{
//     res.setHeader("Content-Type","text/html")
//     res.end("<h1>Welcome to the tutorial</h1>")
// })

// server.listen(process.env.PORT,()=>{
//     const password = process.env.PASSWORD
//     console.log("password is",password)
//     console.log('app is running on port ',process.env.PORT)
// })



// const express = require('express')
// require('dotenv').config()

// const app = express() // initializing the express server
// app.use(express.json())

// // creates a route
// app.get("/",(req,res)=>{
//     res.send('welcome to express js')
// })

// app.get("/about",(req,res)=>{
//     res.send("Welcome to about page")
// })

// app.get("/contact",(req,res)=>{
//     res.send("Welcom to contact page")
// })

// app.post("/login",(req,res)=>{
//     console.log(req.body)
//     res.json({message:'login data received'})
// })

// // starts the server
// app.listen(process.env.PORT,()=>{
//     console.log(`app is running on port ${process.env.PORT}`)
// })


// const express = require('express')
// require('dotenv').config()

// const app = express() // initializing the express server
// app.use(express.json())

// const router = require('./routes/routes')
// app.use("/",router)

// // starts the server
// app.listen(process.env.PORT,()=>{
//     console.log(`app is running on port ${process.env.PORT}`)
// })


// Routing In Express js - 
// A route is a path where the client hits your backend API
// examples - /users, /product, /login

// 4 types - 

// GET route-
// Used to retrieve data

// app.get("/",(req,res)=>{
//     res.send("HOme page")
// })

// POST route - 
// Used to create data

// app.post("/users",(req,res)=>{
//     res.send("User created")
// })

// PUT route -
// used to update data

// app.put("/users",(req,res)=>{
//     res.send("user updated")
// })

// DELETE route -
// used to delete data

// app.delete("/users",(req,res)=>{
//     res.send("user deleted")
// })



// Route Paramentes -
// Used to pass dynamic values in URL like user Id , product id 
// exmple url -
// /users/300


// Query Parameters -
// /search?q=mobile

const express = require('express')
require('dotenv').config()

const app = express() // initializing the express server
app.use(express.json())

// single route parameter
app.get('/users/:id',(req,res)=>{
    res.send('user id ' + req.params.id)
})

// multiple route parameter
app.get('/product/:category/:id',(req,res)=>{
    res.send(`category ${req.params.category} and id ${req.params.id}`)
})

// single query parameters
app.get("/search",(req,res)=>{
    const keyword = req.query.q 
    res.send('you searched for '+ keyword)
})

//multiple query parameters
app.get("/multi-search",(req,res)=>{
    res.json(req.query)
})

// starts the server
app.listen(process.env.PORT,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
})

// status codes and meaning
// 200 - ok(success)
// 201 - created
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not found
// 500 - server error