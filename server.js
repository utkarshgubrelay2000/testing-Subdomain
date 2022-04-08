var express = require('express');
const app=express()
const cors = require("cors")
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/admin/Auth');
var userAuthRouter = require('./routes/student/userAuth');
var sectionRouter = require('./routes/admin/section');
var contactRouter = require('./routes/admin/contact');
var groupRouter = require('./routes/admin/group');
var courseRouter = require('./routes/admin/course');
var courseSRouter = require('./routes/student/course');
var couponRouter = require('./routes/admin/coupon');
var studentRouter = require('./routes/admin/student');
var categoryRouter = require('./routes/admin/category');
var categorySRouter = require('./routes/student/category');
var brandRouter = require('./routes/admin/brand');
var userRouter = require('./routes/admin/user');
var orderRouter = require('./routes/student/user');
var sectionRouter = require('./routes/student/section');
let mongoServer=require('./model/clientConnection')
var busboy = require('connect-busboy');
app.use(busboy());
mongoServer.mongoConnect().then(client=>{
  console.log('conneected to server')

}).catch(err=>{
 console.log('error while connecting to server',err) 
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/auth', authRouter);
app.use('/user/auth/', userAuthRouter);
app.use('/user/section/', sectionRouter);
app.use('/user/category/', categorySRouter);
app.use('/user/course/', courseSRouter);
app.use('/admin', userRouter);
app.use('/admin/course', courseRouter);
app.use('/admin/coupon', couponRouter);
app.use('/admin/student', studentRouter);
app.use('/admin/group', groupRouter);
app.use('/admin/category', categoryRouter);
app.use('/section', sectionRouter);
app.use('/brand', brandRouter);
app.use('/contact', contactRouter);
app.use('/user/order', orderRouter);





app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
