var express = require('express');
const app=express()
const cors = require("cors")
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/admin/Auth');
var userAuthRouter = require('./routes/userAuth');
var sectionRouter = require('./routes/admin/section');
var contactRouter = require('./routes/admin/contact');
var courseRouter = require('./routes/admin/course');
var courseSRouter = require('./routes/course');
var categoryRouter = require('./routes/admin/category');
var categorySRouter = require('./routes/category');
var brandRouter = require('./routes/admin/brand');
var userRouter = require('./routes/admin/user');
var orderRouter = require('./routes/user');
var studentRouter = require('./routes/student');
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
app.use('/user/section/', studentRouter);
app.use('/user/category/', categorySRouter);
app.use('/user/course/', courseSRouter);
app.use('/admin', userRouter);
app.use('/admin/course', courseRouter);
app.use('/admin/category', categoryRouter);
app.use('/section', sectionRouter);
app.use('/brand', brandRouter);
app.use('/contact', contactRouter);
app.use('/user/order', orderRouter);





app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
