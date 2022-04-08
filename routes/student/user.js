const express=require('express')
const router =express.Router()

const orderController=require('../../controller/student/orderController');
const userController=require('../../controller/student/userController');
const { auth } = require('../../middleware/auth');


router.get('/get-my-groups',auth,userController.getMyGroups)
router.put('/order',orderController.createOrder)

module.exports=router