const jwt = require("jsonwebtoken");
const baseModel=require('../model/baseModel')
const bcrypt = require("bcryptjs");
var AWS = require('aws-sdk');
const { sectionData } = require("../services/DefaultData");
AWS.config.apiVersions = {
  route53: '2013-04-01',
  // other service API versions
};
var route53 = new AWS.Route53({ accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

exports.signUp = async (req, res) => {
  let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
  const { firstName, lastName, email, mobile, password,theme } =req.body;
  try {
    const existingUser = await edtechAdminDb.findOne({ email });
    if (existingUser)
      return res.status(400).json({error:true, message: "User already exists" });
   
    const salt = await bcrypt.genSaltSync(10);
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result =await edtechAdminDb.insertOne({
      email,
      mobile,
      password: hashedPassword,
      firstName,
      lastName,
      subdomain:firstName,theme
    });
    let sectionCollection=await baseModel.mongoConnect(firstName,'homepage')
  

 await sectionCollection.insertOne({
        ...sectionData,
      });
    res.status(200).json({ error:false, message: "User created successfully" });
  } catch (err) {
    console.error("Error is ", err);
    res.status(500).json({error:true, message: "Something's wrong" });
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')

  try {
    const existingUser = await edtechAdminDb.findOne({ email });
    if (!existingUser)
      return res.status(404).json({error:true, message: "No User with this Email exists." });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      return res.status(400).json({error:true, message: "Invalid password" });
//console.log(existingUser);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id,subdomain:existingUser.firstName },
      "test",
      { expiresIn: "240h" }
    );
//     var subDomainName = existingUser.firstName;

// var params = {
//   ChangeBatch: {
//     Changes: [
//       {
//         Action: "CREATE",
//         ResourceRecordSet: {
//           AliasTarget: { 
//             DNSName: "testbrandwick.com",
//             EvaluateTargetHealth: false,
//             HostedZoneId: "Z09497883BWP3MGTKYB6W" 
//           },
//           Name: "jay"+".testbrandwick.com",
//           Type: "A"
//         }
//       }],
//       },
  
//       HostedZoneId: "Z09497883BWP3MGTKYB6W",// Depends on the type of resource that you want to route traffic to
//      };
//      route53.changeResourceRecordSets(params, function(err, data) {

//       if (err) console.log(err.stack); // an error occurred
      
//       else console.log(data);
//     });
    res.status(200).json({error:false, result: existingUser, token });
  
  } catch (err) {
    console.log("Error is", err);
    res.status(500).json({error:true, message: "Something's wrong" });
    console.log(err.message);
}
};

