const express=require('express')
const router =express.Router()

const userController=require('../../controller/admin/userController');
const { auth } = require('../../middleware/auth');


router.post('/upload-image',auth,userController.postUploadImage)
router.patch('/create-new-password/:token',userController.createNewPassword)
router.patch('/update-payment-details',auth,userController.paymentDetails)
router.post('/invite-teacher',auth,userController.inviteTeacher)

module.exports=router