var express = require('express');
var router = express.Router();
var userAuthentication=require('../controller/userAuthController')
/* GET home page. */
router.post('/signup',userAuthentication.signUp,err=>{
  console.log('error while signup user')
})
router.post('/signin',userAuthentication.signIn,err=>{
  console.log('error while signup user')
})

module.exports=router