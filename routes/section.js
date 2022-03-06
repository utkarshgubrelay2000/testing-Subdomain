var express = require('express');
var router = express.Router();
var sectionController=require('../controller/sectionController')
/* GET home page. */
router.post('/:section',sectionController.addSection,err=>{
  console.log('error while signup user')
})
router.put('/:section/:id',sectionController.editSection,err=>{
  console.log('error while signup user')
})
router.get('/:section',sectionController.getSection,err=>{
    console.log('error while signup user')
  })
  router.get('/:section/:id',sectionController.getSectionById,err=>{
    console.log('error while signup user')
  })

module.exports=router