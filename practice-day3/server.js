const express = require('express')
const app = express()

app.use(express.json())

app.get("/students", (req, res) => {
    res.status(200).json([{
        name: "ankit",
        contact: "98989898989"
    }, {
        name: "raj",
        contact: "98989898989"
    }])
})

app.get("/student/:id", (req, res) => {
    const { id } = req.params

    const find = true

    if (find === true) {
        res.status(200).json({
            name: "raj",
            contact: "98989898989"

        })
    }

    res.status(404).json({})

})

app.post("/student", (req, res) => {
    const { name, contact } = req.body
    res.status(201).json({
        name,
        contact
    })
})

app.put("/student/:id", (req, res) => {
    const { name, contact } = req.body
    res.status(200).json({
       message:"updated the student",
       data:{
        name,contact
       }
    })
})


app.delete("/student/:id", (req, res) => {
   
    res.status(200).json({
       message:"deleted the student"
    })
})

app.get('/user/:id', (req, res) => {
    const { id } = req.params
    res.status(404).json({ message: `${id} not found in db` })
})

// Status code - 500 mostly used in catch block

app.listen(5000, () => {
    console.log(`server is running on 5000`)
})
