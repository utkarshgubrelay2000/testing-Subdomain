var express = require('express');
var router = express.Router();
var contactController=require('../controller/contactController')
/* GET home page. */
router.post('/',contactController.addcontact,err=>{
  console.log('error while signup user')
})
router.put('/:id',contactController.editcontact,err=>{
  console.log('error while signup user')
})
router.get('/',contactController.getcontact,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',contactController.getcontactById,err=>{
    console.log('error while signup user')
  })

module.exports=router