var express = require('express');
var router = express.Router();
var studentController=require('../controller/student/courseController');

/* GET home page. */

router.get('/',studentController.getCourse,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',studentController.getCourseById,err=>{
    console.log('error while signup user')
  })

module.exports=router