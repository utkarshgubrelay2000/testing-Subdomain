var express = require('express');
var router = express.Router();
var brandController=require('../../controller/admin/brandController');
const  verifyAdmin = require('../../middleware/auth');

router.post('/',verifyAdmin.auth,brandController.addbrand,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,brandController.editbrand,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,brandController.getbrand,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,brandController.getbrandById,err=>{
    console.log('error while signup user')
  })

module.exports=router