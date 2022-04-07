var express = require('express');
var router = express.Router();
var sectionController=require('../controller/student/sectionController');

/* GET home page. */

router.get('/',sectionController.getSection,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',sectionController.getSectionById,err=>{
    console.log('error while signup user')
  })

module.exports=router