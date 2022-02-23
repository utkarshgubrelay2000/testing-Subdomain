const express=require('express')
const router =express.Router()
const courseController=require("../controller/courseController")
const verifyAdmin = require('../middleware/verifyAdmin');
const UploadPdf = require('../middleware/multerMiddleware');

router.post('/upload-pdf',UploadPdf.imagesUploadMiddleware([{name:'upl',maxCount:1}]),courseController.postUploadImage)
router.get('/get-invalid-course',courseController.getAllCourseWithoutCategoryAndInstructor)
router.get('/courseById/:courseId',courseController.getCourseById)
router.post('/add-new-course',verifyAdmin,courseController.addNewCourse,(err)=>{
    console.log('something went wrong')
})
router.put('/set-course-trending/:id',verifyAdmin,courseController.setCourseTrending)
router.put('/update-course/:courseId',verifyAdmin,courseController.updateCourse)
router.delete('/deletecourse/:courseId',verifyAdmin,courseController.deleteCourse )
module.exports=router