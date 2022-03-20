var express = require('express');
const app=express()
const cors = require("cors")
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/Auth');
var userAuthRouter = require('./routes/userAuth');
var sectionRouter = require('./routes/section');
var contactRouter = require('./routes/contact');
var brandRouter = require('./routes/brand');
var userRouter = require('./routes/user');
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
app.use('/admin', userRouter);
app.use('/section', sectionRouter);
app.use('/brand', brandRouter);
app.use('/contact', contactRouter);





app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
