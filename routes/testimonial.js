const express=require('express')
const router =express.Router()
const testimonialController=require("../controller/testimonialsController")
const verifyAdmin = require('../middleware/verifyAdmin');
router.get('/testimonial',testimonialController.getAlltestimonials)
router.get('/get-testimonial-by-Id/:testimonialId',testimonialController.gettestimonialById)
router.post('/create-testimonial',verifyAdmin,testimonialController.createTestimonial,(err)=>{
    console.log('something went wrong')
})
router.put('/update-testimonial/:testimonialId',verifyAdmin,testimonialController.updatetestimonial)
router.delete('/delete-testimonial/:testimonialId',verifyAdmin,testimonialController.deletetestimonial )
module.exports=router