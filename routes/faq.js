var express = require('express');
const FaqController= require('../controller/FaqController');
var router = express.Router();
var verifyAdmin=require('../middleware/verifyAdmin')


/* GET home page. */
router.post('/add-faq',verifyAdmin,FaqController.createFaq,err=>{
  console.log('error while signup user')
})
router.put('/faq/:id',verifyAdmin,FaqController.editFaq,err=>{
  console.log('error while signup user')
})

/// FORGOT PASSWORD APIS  //////
router.get('/faq/:id',verifyAdmin, FaqController.getFaqById)
router.get('/faqs/:id',verifyAdmin, FaqController.getAllFaqByCourse)
router.delete('/faq/:id',verifyAdmin, FaqController.deleteFaq)


module.exports=router