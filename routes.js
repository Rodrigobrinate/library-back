const express = require('express')
const path = require("path")
const multer = require("multer")
const router = express.Router()
const IndexController = require('./controllers/Index.controller')
const LoginController = require('./controllers/Login.controller')
const RegisterController = require('./controllers/Register.controller')
const LibraryController = require('./controllers/Library.controller')
const jwtVerify = require('./middleware/jwtVerify')



const upload = multer({ storage: multer.diskStorage({
    destination: 'uploads/',
    limits: { fileSize: 500 * 1024 * 1024 },
    filename(req, file, callback) {
      const fileName = `${new Date().getTime()}-${file.originalname}`

      return callback(null, fileName, file)
    },
  }),})








router.get('/', jwtVerify, IndexController.index)
router.post('/login', LoginController.login)
router.post('/register', RegisterController.register)

router.post('/upload', jwtVerify, upload.single('image'), LibraryController.upload)
//router.post('/recovery/password', Usercontroller.recoveryPassword)

 router.get('/books', jwtVerify, LibraryController.books)
 router.get('/books/:id', jwtVerify, LibraryController.book)
 router.post('/books/:id', jwtVerify, LibraryController.update)

router.get('/t', jwtVerify, (req, res) => {
    res.json(req.user)
})
module.exports = router 