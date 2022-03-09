var express = require('express');
var router = express.Router();
var brandController=require('../controller/brandController')
/* GET home page. */
router.post('/',brandController.addbrand,err=>{
  console.log('error while signup user')
})
router.put('/:id',brandController.editbrand,err=>{
  console.log('error while signup user')
})
router.get('/',brandController.getbrand,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',brandController.getbrandById,err=>{
    console.log('error while signup user')
  })

module.exports=router