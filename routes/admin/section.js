var express = require('express');
var router = express.Router();
var sectionController=require('../../controller/admin/sectionController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,sectionController.addSection,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,sectionController.editSection,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,sectionController.getSection,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,sectionController.getSectionById,err=>{
    console.log('error while signup user')
  })

module.exports=router