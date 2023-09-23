const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000
const multer = require('multer');
const cors = require('cors');



//CONTROLLERS
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})


//MIDDLEWARES
app.use(express.json())
app.use(cors())
//console.log(PORT)


//ROUTES
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

const upload = multer({storage});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.json({ Status: "Success" })
})


//APP LISTENING
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})