var express = require('express');
var router = express.Router();
var sectionController=require('../controller/sectionController')
/* GET home page. */
router.post('/',sectionController.addSection,err=>{
  console.log('error while signup user')
})
router.put('/:id',sectionController.editSection,err=>{
  console.log('error while signup user')
})
router.get('/',sectionController.getSection,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',sectionController.getSectionById,err=>{
    console.log('error while signup user')
  })

module.exports=router