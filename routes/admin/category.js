var express = require('express');
var router = express.Router();
var categoryController=require('../../controller/admin/categoryController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,categoryController.addCategory,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,categoryController.editCategory,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,categoryController.getCategory,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,categoryController.getCategoryById,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,categoryController.deleteCategory,err=>{
    console.log('error while signup user')
  })

module.exports=router