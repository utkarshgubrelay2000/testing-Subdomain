var express = require('express');
const InstructorController = require('../controller/InstructorController');
var router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
/* GET home page. */
router.get('/checking', verifyAdmin, (req, res) => {
  res.json('ok')
}, err => {
  console.log('error while signup user')
})
router.get('/getAllInstructors', InstructorController.getAllInstructor, err => {
  console.log('error while signup user')
})
router.get('/get-instructors-by-id/:id', InstructorController.getInstructorById, err => {
  console.log('error while signup user')
})

router.post('/createInstructor', verifyAdmin, InstructorController.createInstructor, err => {
  console.log('error while signup user')
})
router.post('/create-instructor', verifyAdmin, InstructorController.createInstructor, err => {
  console.log('error while signup user')
})
router.put('/updateInstructor/:id', verifyAdmin, InstructorController.updateInstructor, err => {
  console.log('error while signup user')
})
router.delete('/deleteInstructor/:id', verifyAdmin, InstructorController.deleteInstructor, err => {
  console.log('error while signup user')
})
module.exports = router