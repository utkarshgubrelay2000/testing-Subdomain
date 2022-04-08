var express = require('express');
var router = express.Router();
var eventController=require('../../controller/admin/eventController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,eventController.addEvent,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,eventController.editEvent,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,eventController.getEvent,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,eventController.getEventById,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,eventController.deleteEvent,err=>{
    console.log('error while signup user')
  })

module.exports=router