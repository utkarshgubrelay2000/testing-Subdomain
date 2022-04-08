const express=require('express')
const router =express.Router()

const userController=require('../../controller/admin/userController');
const { auth } = require('../../middleware/auth');


router.post('/upload-image',auth,userController.postUploadImage)
router.put('/create-new-password/:token',userController.createNewPassword)
router.put('/update-payment-details/:type',auth,userController.paymentDetails)
router.get('/get-payment-details/:type',auth,userController.getPaymentDetails)
router.post('/invite-teacher',auth,userController.inviteTeacher)

module.exports=router