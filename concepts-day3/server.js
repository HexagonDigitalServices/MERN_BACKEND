// const express = require('express')
// const app = express()

// app.use(express.json())

// // express.urlencoded() middleware for form data handling
// app.use(express.urlencoded({extended:true}))

// //serve static files
// app.use(express.static('public'))

// app.post('/submit',(req,res)=>{
//     console.log(req.body)
// })

// // custom middleware
// app.use((req,res,next)=>{
//     console.log('request method',req.method)
//     console.log('request url',req.url)
//     next()
// })

// app.get("/profile", (req, res) => {
//     res.status(200).json({
//         name: "ankit",
//         role: "Trainer",
//         exeperience: "3 Years"
//     })
// })

// app.get("/user", (req, res) => {
//     res.status(200).json({
//         name: "ankit",
//         role: "Trainer",
//         exeperience: "3 Years"
//     })
// })

// app.post("/user", (req, res) => {
//     const {name,role,exeperience}= req.body
//     res.status(201).json({
//         name,
//         role,
//         exeperience
//     })
// })

// app.get('/user/:id',(req,res)=>{
//     const {id} = req.params
//     res.status(404).json({message:`${id} not found in db`})
// })

// // Status code - 500 mostly used in catch block

// // appliation level middleware
// // app.use()

// // Built-in middleware
// // express.json(),express.urlencoded()

// // Router-level middleware

// // Third-party middleware
// // CORS, multer,rate-limit

// // Error handling middleware 
// // (err,req,res,next)


// app.listen(5000, () => {
//     console.log(`server is running on 5000`)
// })



const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors()) // if frontend is on localhost:3000 or localhost:4000 they all can access backend

// app.use({
//     origin:['http://localhost:3000'] // forntend running on localhost:3000 can access backend
// })


app.get('/error',(req,res)=>{
    throw new Error('wanted error')
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log('error is this',err)
    res.status(500).send("something went wrong")
})

app.listen(5000, () => {
    console.log(`server is running on 5000`)
})



