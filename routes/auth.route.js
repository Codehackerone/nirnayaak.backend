const express = require('express');
const multer = require('multer');
const route = new express.Router()


const {postLogin} = require('../controllers/auth.controller')
const {postRegister} = require('../controllers/auth.controller')

const auth = require('../middleware/auth');
const User = require('../models/user.model');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       

const maxSize = 1 * 1000 * 1000;

let upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic"); 

route.post('/register', postRegister)
route.post('/login', postLogin)
route.post('/delete', (req, res) => {
    User.findOneAndDelete({email: req.body.email})
    .then((user) => {
        if(!user) {
            return res.status(404).send('error')
        }
        res.status(200).send('deleted')
    })
})
route.post('/upload',(req,res) => {  

});  


module.exports = route