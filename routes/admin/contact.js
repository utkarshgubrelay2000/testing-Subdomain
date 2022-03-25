var express = require('express');
var router = express.Router();
var contactController=require('../../controller/admin/contactController')
const  verifyAdmin = require('../../middleware/auth');

/* GET home page. */
router.post('/',verifyAdmin.auth,contactController.addcontact,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,contactController.editcontact,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,contactController.getcontact,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,contactController.getcontactById,err=>{
    console.log('error while signup user')
  })

module.exports=router