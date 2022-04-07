var express = require('express');
var router = express.Router();
var couponController=require('../../controller/admin/couponController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,couponController.addCoupon,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,couponController.editCoupon,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,couponController.getCoupon,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,couponController.getCouponById,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,couponController.deleteCoupon,err=>{
    console.log('error while signup user')
  })

module.exports=router