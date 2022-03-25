const express=require('express')
const router =express.Router()

const userController=require('../controller/admin/userController');
const { auth } = require('../middleware/auth');


router.post('/upload-image',auth,userController.postUploadImage)

module.exports=router