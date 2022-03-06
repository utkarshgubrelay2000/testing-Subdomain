var express = require('express');
const app=express()
const cors = require("cors")
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/Auth');
var userAuthRouter = require('./routes/userAuth');
var sectionRouter = require('./routes/section');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/auth', authRouter);
app.use('/user/auth/', userAuthRouter);
app.use('/section', sectionRouter);





app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
