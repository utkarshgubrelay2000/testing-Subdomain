var express = require('express');
const categoryController= require('../controller/categoryController');
var router = express.Router();
var verifyAdmin=require('../middleware/verifyAdmin')


/* GET home page. */
router.post('/category',verifyAdmin,categoryController.createCategory,err=>{
  console.log('error while signup user')
})
router.put('/category/:id',verifyAdmin,categoryController.editCategory,err=>{
  console.log('error while signup user')
})
router.put('/subcategory/:subCategoryId',verifyAdmin,categoryController.editSubCategory,err=>{
  console.log('error while signup user')
})
router.put('/addsubcategory/:categoryId',verifyAdmin,categoryController.addSubCategory,err=>{
  console.log('error while signup user')
})
router.delete('/removesubcategory/:subcategoryId',verifyAdmin,categoryController.removeSubCategory,err=>{
  console.log('error while signup user')
})
/// FORGOT PASSWORD APIS  //////
router.get('/category/:id',verifyAdmin, categoryController.getCategoryById)
router.delete('/category/:id',verifyAdmin, categoryController.deleteCategory)
router.get('/categorys',verifyAdmin, categoryController.getAllCategory)


module.exports=router