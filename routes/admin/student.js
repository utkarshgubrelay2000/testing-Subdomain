var express = require('express');
var router = express.Router();
var studentController=require('../../controller/admin/studentController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.put('/',verifyAdmin.auth,studentController.inviteStudent,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,studentController.removeStudentsFromGroup,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,studentController.addStudentsToGroup,err=>{
    console.log('error while signup user')
  })

module.exports=router