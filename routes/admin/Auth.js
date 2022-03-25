var express = require('express');
var router = express.Router();
var adminAuthentication=require('../../controller/admin/authController');

/* GET home page. */
router.post('/signup',adminAuthentication.signUp,err=>{
  console.log('error while signup user')
})
router.post('/signin',adminAuthentication.signIn,err=>{
  console.log('error while signup user')
})

module.exports=router