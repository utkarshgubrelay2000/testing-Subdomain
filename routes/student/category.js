var express = require('express');
var router = express.Router();
var studentController=require('../../controller/student/categoryController');

/* GET home page. */

router.get('/',studentController.getCategory,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',studentController.getCategoryById,err=>{
    console.log('error while signup user')
  })

module.exports=router