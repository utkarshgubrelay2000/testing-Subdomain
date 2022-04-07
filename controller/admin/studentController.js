
var aws = require('aws-sdk');
const { sendMail } = require('../../services/mailService');
var jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const baseModel = require('../../model/baseModel');
const ObjectId = require('mongodb').ObjectId;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
//  Bucket: process.env.AWS_BUCKET_NAME,
});

exports.inviteStudent=async(req,res,next)=>{
  try {
    
 console.log(req.subdomain,req.userId)
  let {email,mobile,firstName,lastName}=req.body
  let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
  let studentDb=await baseModel.mongoConnect('edtechAdmin','users')
  req.userId=ObjectId(req.userId)
  let userDetails=await edtechAdminDb.findOne({_id:req.userId });
console.log(userDetails)
//edtechAdminDb.updateMany({},{$set:{role:"admin"}})
    const result =await studentDb.insertOne({
      email,
      mobile,
      // password: hashedPassword,
      firstName,
      lastName,
  
    });
   // result.save()
   console.log(result)
  // let existingUser=await edtechAdminDb.findOne({email:email})
    const token = jwt.sign(
      { email: email, id: result.insertedId },
      "test",
      { expiresIn: "240h" }
    );
    let link='http://localhost:3000/invitation-login/'+token
    let toSubsciberMail = {
      to: "gubrelayutkarsh2000@gmail.com",
      from: "gubrelayutkarsh2000@gmail.com",
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
  
} catch (error) {
  res.status(503).json({error:true,message:error.message})
    
}

}


exports.addStudentsToGroup = async (req, res) => {
  try { 
let {groupId,students} = req.body;
groupId=ObjectId(groupId)
let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
    let groupAdmin = await baseModel.mongoConnect(
      'edtechAdmin',
      "users"
    );
    let userId=ObjectId(req.userId)
    groupAdmin=groupAdmin.findOne({_id:userId})
      let studentCollection = await baseModel.mongoConnect(
        req.subdomain,
        "students"
      );
      let groupModel = await baseModel.mongoConnect(
        req.subdomain,
        "group"
      );


if(students && students.length>0){
  let studentsIds=students.map(student=>ObjectId(student))
  students=studentsIds
  let datastudents=await studentCollection.find({_id:{$in:students}}).toArray()
 console.log("datastudents",datastudents,students)
 for (let index = 0; index < datastudents.length; index++) {
  
   const element = datastudents[index];
   let toSubsciberMail = {
    to: element.email,
    from: "noreplyaslichandi@gmail.com",
    subject: "Admin added you to group",
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
             ${groupAdmin.firstName +" " +groupAdmin.lastName} Send you a Invitation to
           to join his workSpace
            </span> 
          </label>
          <div>

           <h2>Admin Added you to a group</h2>
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
  };//
   //sendMail(toSubsciberMail)
 }
 await groupModel.findOneAndUpdate({_id:groupId},{$addToSet:{students:{$each:students}}},{multi:true})
 await studentCollection.updateMany({_id:{$in:students}},{$addToSet:{group:groupId}},{multi:true})

}
res.status(201).json({error:false,data:"Added"})
} catch (error) {
console.log(error)
  res.status(503).json({error:true,data:'Some Error Occured'})
      
}
};
exports.removeStudentsFromGroup = async (req, res) => {
  let {groupId,studentId} = req.body;
  try {
    
  
let subdomain = req.subdomain
    console.log("subdomain", subdomain);
    let studentCollection = await baseModel.mongoConnect(
      req.subdomain,
      "students"
    );
    let groupModel = await baseModel.mongoConnect(
      req.subdomain,
      "group"
    );
    groupId=ObjectId(groupId)
    studentId=ObjectId(studentId)
    let group=await groupModel.findOne({_id:groupId},{$pull:{students:studentId}})
    console.log(studentId)
    let student=await studentCollection.findOneAndUpdate({_id:studentId},{$pull:{group:groupId}})
    res.json({error:false,data:"Removed"})
  } catch (error) {
    res.status(503).json({error:true,data:'Some Error Occured',message:error.message})
  }
}