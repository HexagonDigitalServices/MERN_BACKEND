const home = (req,res)=>{
    res.send("WElcome to home contoller")
}

const about = (req,res)=>{
    res.send("about contoller")
}

const contact = (req,res) => {
    res.send("contact contoller")
}

module.exports = {home,about,contact}