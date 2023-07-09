import express from 'express'
import path from 'path'
import multer from 'multer'

const app = express()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename:(req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage}) 


app.use(express.json())
app.set("view engine", "ejs")


//GET API
app.get("/upload", (req, res) => {
  res.render("upload")
}
)
//POST API
app.post("/upload", upload.single('image'), (req, res) => {
  res.send("uploaded")
}
)


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})