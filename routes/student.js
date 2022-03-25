var express = require('express');
var router = express.Router();
var studentController=require('../controller/student/studentController');

/* GET home page. */

router.get('/',studentController.getSection,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',studentController.getSectionById,err=>{
    console.log('error while signup user')
  })

module.exports=router