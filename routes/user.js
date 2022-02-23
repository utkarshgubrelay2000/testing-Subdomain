const express=require('express')
const router =express.Router()
const verifyAdmin = require('../middleware/verifyAdmin');
const userController=require('../controller/userController')

router.get('/get-Orders',verifyAdmin,userController.getOrders);
router.get('/get-my-profile',verifyAdmin,userController.getMyProfile);
router.get('/get-all-users',verifyAdmin,userController.getAllUsers);
router.post('/create-user',verifyAdmin,userController.createUser);
router.get('/get-affliate-orders',verifyAdmin,userController.getRefUsers);
router.get('/get-user-cart/:id',verifyAdmin,userController.getUserCart);
router.post('/assign-course-to-user',verifyAdmin,userController.assignCourse)
router.post('/remove-course-from-user',verifyAdmin,userController.RemoveCourse)
module.exports=router