const nodemailer =require("nodemailer")


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "*******",
      pass: "*******",
    },
    from: "****",
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log("error in setting transporter", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  exports.sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } 


//   import nodemailer from "nodemailer";
// import AWS from "aws-sdk"
// import dotenv from 'dotenv'
// dotenv.config();

// AWS.config.update({
//   accessKeyId: process.env.AWS_USER_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
//   region: "ap-south-1"
// });

// const ses = new AWS.SES();

// const transporter = nodemailer.createTransport({
//   SES: ses,
 
// });


  
