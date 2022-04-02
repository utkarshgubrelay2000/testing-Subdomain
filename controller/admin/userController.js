
var aws = require('aws-sdk');
const { sendMail } = require('../../services/mailService');
var jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const baseModel = require('../../model/baseModel');
const { ObjectId } = require('mongodb');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
//  Bucket: process.env.AWS_BUCKET_NAME,
});
exports.postUploadImage = (req, res, next) => {
  
  try {
   console.log(req.subdomain)
  
    const bb = req.busboy;
    req.pipe(req.busboy);
let imageArray=[]
    req.busboy.on('file', (name, file, info) => {
  const { filename, encoding, mimeType } = info;
  
 console.log(filename);
  let fileName = filename;

  let params={
    Bucket: 'testbrandwick/'+req.subdomain,
    Key: fileName,
    Body: file,
    ACL: 'public-read',
  }
  s3.upload(params, (err, data) => {
		if (err) {
			console.log(err);
	//		res.status(400).json({ error: 'Upload to S3 failed.' });
		}
    else{

      res.status(200).json({
        url: data.Location,
        key: data.key
      });
    }
	}
	);

});


} catch (error) {
   console.log(error) 
}
 
}
exports.inviteTeacher=async(req,res,next)=>{
  try {
    
 console.log(req.subdomain,req.userId)
  let {email,mobile,firstName,lastName}=req.body
  let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users');
  req.userId=ObjectId(req.userId)
  let userDetails=await edtechAdminDb.findOne({_id:req.userId });
console.log(userDetails)
//edtechAdminDb.updateMany({},{$set:{role:"admin"}})
  if(userDetails.role=='admin'){
let checkEmail=await edtechAdminDb.findOne({email:email})
if(checkEmail)
return res.status(502).json({error:true,message:"Email is already in use"})


    const result =await edtechAdminDb.insertOne({
      email,
      mobile,
      // password: hashedPassword,
      firstName,
      lastName,
      subdomain:req.subdomain,theme:userDetails.theme,role:'teacher'
    });
   // result.save()
   let existingUser=await edtechAdminDb.findOne({email:email})
    const token = jwt.sign(
      { email: email, id: existingUser._id,subdomain:existingUser.firstName },
      "test",
      { expiresIn: "240h" }
    );
    let link='http://localhost:3000/invitated/'+token
    let toSubsciberMail = {
      to: email,
      from: "noreplyaslichandi@gmail.com",
      subject: " Teacher invitation",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossorigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
            rel="stylesheet"
          />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>welcome to Edu</title>
          <style>
            body {
              background-color: #ffffff;
              padding: 0;
              margin: 0;
              font-family: "Open Sans", sans-serif;
              font-weight: 600;
              color: #803487;
            }
            a{
                text-decoration:none;
                color:black !important ;
              } 
              
            
            .mainhead{
              height: 20vh;
  background-color: rgb(31, 30, 30);
  width: 90%;
  margin: auto;
color: white;
text-align: center;
justify-self: auto;
margin-top: 60px;
font-size: 30px;
            }
            .secondhead{
              height: 18vw;
               font-weight:600;   font-size:16px;
  border: 1px solid rgb(31, 30, 30);
  width: 90%;

  margin: auto;
color: black;
text-align: left;
justify-self: auto;

            }
            .mainhead > .mainheading {
  line-height: 120px;
}

.secondhead > .mainheading{
width: 95%;
margin-left: 10px;
}             .cta-bta{  margin:8px;
/* button css*/
color: #fff !important;
text-transform: uppercase;
text-decoration: none;
margin:8px;
background: rgb(31, 30, 30);
padding: 10px;
   border-radius: 5px;  margin-left:10px;

display: inline-block;
border: none;
transition: all 0.4s ease 0s;
}
.link-color{
color: white !important;
}
.span{
font-size:12px;
color:black !important;
}      

.margin{
margin-left:10px;
}
          </style>
        </head>
        <body style="background-color: #ffffff;">
       <div style="padding-left:10px;margin:auto">
          <table
            cellpadding="0"
            cellspacing="10"
            height="100%"
            width="60%"
            style="max-width: 650px"
            id="bodyTable"
          >
          
            <tr>
           <div class="mainhead">
             <h1 class="mainheading" >
           
                Edu CRM
           
            </h1>
           </div>
           <div class="secondhead">
            <label class="mainheading" style="margin-top:40px" >
             <span >
               ${userDetails.firstName +" " +userDetails.lastName} Send you a Invitation to
             to join his workSpace
              </span> 
            </label>
            <div>

              <button class="cta-bta">
              <a href='${link}' class="link-color">
                Login to Create Your Credits
                </a>
              </button>
           
            </button>
            <br>
            <div class='margin'>
            <span>
            In Case the Link is not working please copy the link and paste it in browser
            </span>
            <span class='span'>
            <br>
           
            </span>
            </div>
            </div>
            </div>
            </tr>
          </table>
       </div> </body>
      </html>
    `,
    };
    sendMail(toSubsciberMail);
    res.json({error:false,message:"Invitation sent successfully"})
  }
  else{
    res.status(503).json({error:true,message:"Only Admin can do this Actions"})
  }
} catch (error) {
  res.status(503).json({error:true,message:error.message})
    
}

}
exports.createNewPassword=async (req,res)=>{
  try {
    console.log(req.params.token);
  let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users');
let token=req.params.token;
  let  decodedData = jwt.verify(token, "test");
  let userId=ObjectId(decodedData.id)
// let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users');
  let user=await edtechAdminDb.findOne({_id:userId})
      if (!user) {
        res.status(400).json({error:false,data:"token expires"});
        //console.log("jjj", user.expireToken, Date.now());
      } else {
        bcrypt.hash(req.body.password, 12).then((newpassword) => {
          edtechAdminDb.updateOne({_id:userId},{$set:{password:newpassword}})
          res.status(200).json({error:false,message:"Password changed successfully"})
         
        });
      }
    
  } catch (error) {
    console.log(error);
  }
}
exports.paymentDetails=async (req,res)=>{
  try {
    let {razorpayKey,razorpaySecret}=req.body;
    console.log(req.subdomain)
    let edtechAdminDb=await baseModel.mongoConnect(req.subdomain,'paymentDetails');
    let user=await edtechAdminDb.updateMany({}
,{$set:{razorpayKey:razorpayKey,razorpaySecret:razorpaySecret}},{upsert:true,new:true})
    
    if(user){
      res.status(200).json({error:false,data:user})
    }
    else{
      res.status(400).json({error:true,message:"User not found"})
    }
  } catch (error) {
    res.status(400).json({error:true,message:error.message})
  }
}