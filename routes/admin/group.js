var express = require('express');
var router = express.Router();
var groupController=require('../../controller/admin/groupController');
const  verifyAdmin = require('../../middleware/auth');
/* GET home page. */
router.post('/',verifyAdmin.auth,groupController.addGroup,err=>{
  console.log('error while signup user')
})
router.put('/add-in-event',verifyAdmin.auth,groupController.addGroupsToEvent,err=>{
  console.log('error while signup user')
})
router.put('/remove-from-event',verifyAdmin.auth,groupController.removeFromEvent,err=>{
  console.log('error while signup user')
})
router.put('/:id',verifyAdmin.auth,groupController.editGroup,err=>{
  console.log('error while signup user')
})
router.get('/',verifyAdmin.auth,groupController.getGroup,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,groupController.getGroupById,err=>{
    console.log('error while signup user')
  })
  router.get('/:id',verifyAdmin.auth,groupController.deleteGroup,err=>{
    console.log('error while signup user')
  })

module.exports=router