const express=require('express')
const router =express.Router()

const userController=require('../controller/student/orderController');
const { auth } = require('../middleware/auth');


router.patch('/',userController.createOrder)

module.exports=router