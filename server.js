var express = require('express');
const app=express()
const path=require('path')
const cors = require("cors")
const mongoose=require('mongoose')
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/Auth');
var categoryRouter = require('./routes/category');
var courseRouter = require('./routes/course');
var couponRouter = require('./routes/coupon');

var userRouter = require('./routes/user');
var faqRouter = require('./routes/faq');
var testimonialsRouter = require('./routes/testimonial');
var InstructorRouter = require('./routes/Instructor');


const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://utkarshgubrelay:yoyok1lakaar@cluster0.fkcq0.gcp.mongodb.net');
 client.connect().then(()=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})



mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
app.use(express.static(path.join(__dirname, 'public')));
//mongoose.connection.on("connected", () => {
//console.log("connected to mongo yeah !");
//});

mongoose.connection.on("error",()=>{
  console.log("error connecting to mongo " ,)
}).catch(err =>{
console.log("error is",err)
})
app.use((req, res, next)=> {

  // if subdomains
  if (req.subdomains.length) {

    // this is trivial, you should filtering out things like `www`, `app` or anything that your app already uses.

    const subdomain = req.subdomains.join('.');

    // forward to internal url by reconstructing req.url
console.log('utkarsh')
    req.url = `/subdomains/${subdomain}${req.url}`
  }
  return next()
});

app.get('/signup-s', (req, res) => {


  //... do some validations / verifications
  // e.g. uniqueness check etc

  res.redirect(`https://utkarsh.${req.hostname}:4000`);
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

///Router
/// Server check
app.get('/:getDbName',async function(req, res, next) {
  console.log(req.params.getDbName)
 let db=client.db(req.params.getDbName);

 let collections= db.collection('users')
 const insertResult = await collections.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
console.log('Inserted documents =>', insertResult);
res.send("connected")
});
// Auth Routers
app.use('/',authRouter)
app.use('/',categoryRouter)
app.use('/',courseRouter)

app.use('/',couponRouter)
app.use('/',userRouter)
app.use('/',testimonialsRouter)
app.use('/',InstructorRouter)
app.use('/',faqRouter)






app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});
mongoose.set("useFindAndModify", false);

module.exports = app;
