var express = require('express');
var router = express.Router();
var courseController=require('../../controller/admin/courseController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,courseController.addCourse,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,courseController.editCourse,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,courseController.getCourse,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,courseController.getCourseById,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,courseController.deleteCourse,err=>{
    console.log('error while signup user')
  })

module.exports=router