const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())

const uploadDir = path.join(__dirname,"uploads")
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

app.use("/uploads",express.static(uploadDir))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now().toLocaleString() + "-" + Math.round(Math.random() * 1000);
    cb(null, baseName + "-" + uniqueSuffix + ext);
  },
});

function fileFilter(req,file,cb){
    const allowed = ["image/jpeg","image/png","image/jpg","image/gif"]
    if(allowed.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("only image files are allowed"),false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
})

app.post("/upload",upload.single("avatar"),(req,res)=>{
    console.log('okay')
    if(!req.file){
        return res.status(400).json({success:false,message:"no file uploaded"})
    }
    const file = req.file
    const fileUrl = `http://localhost:${PORT}/uploads/${file.filename}`
    return res.json({
        success:true,
        message:"file uploaded successfully",
        file:{
            originalname:file.originalname,
            filename:file.filename,
            mimetype:file.mimetype,
            size:file.size,
            url:fileUrl
        }
    })
})

app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({success:false,message:"file too large, max 5MB allowed"})
        }
        return res.status(400).json({sucees:false,message:err.message})
    } else if(err){
        return res.status(400).json({success:false,message:err.message})
    }
    next()
})

app.listen(PORT,()=>{
    console.log(`Backend running at port ${PORT}`)
})