const jwt = require("jsonwebtoken");
const baseModel=require('../model/baseModel')
const bcrypt = require("bcryptjs");
const { getSubDomain } = require("../services/subdomainServices");

 

exports.signUp = async (req, res) => {
    const { firstName, lastName, email, mobile, password } =req.body;
    let subdomain=await getSubDomain(req.get('host'))
    console.log('subdomain',subdomain);
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, message: "Wrong Url" });
    
    let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
//   let subdomainPresent=await edtechAdminDb.findOne({subdomain})
//     if(!subdomainPresent)
//     return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    try {
        let edtechTeacherDb=await baseModel.mongoConnect(subdomain,'users')
        const existingUser = await edtechTeacherDb.findOne({ email });
        if (existingUser)
          return res.status(400).json({error:true, message: "User already exists" });
       
        const salt = await bcrypt.genSaltSync(10);
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const result =await edtechTeacherDb.insertOne({
          email,
          mobile,
          password: hashedPassword,
          firstName,
          lastName,
        });
      
        res.status(200).json({ error:false, message: "User created successfully" });
      } catch (err) {
        console.error("Error is ", err);
        res.status(500).json({error:true, message: "Something's wrong" });
      }
//   let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
//   const { firstName, lastName, email, mobile, password } =req.body;
//   try {
//     const existingUser = await edtechAdminDb.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({error:true, message: "User already exists" });
   
//     const salt = await bcrypt.genSaltSync(10);
//     console.log(password);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const result =await edtechAdminDb.insertOne({
//       email,
//       mobile,
//       password: hashedPassword,
//       firstName,
//       lastName,
//     });
  
//     res.status(200).json({ error:false, message: "User created successfully" });
//   } catch (err) {
//     console.error("Error is ", err);
//     res.status(500).json({error:true, message: "Something's wrong" });
//   }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let subdomain=await getSubDomain(req.get('host'))
  console.log('subdomain',subdomain);
  let edtechAdminDb=await baseModel.mongoConnect(subdomain,'users')

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
console.log(existingUser);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "240h" }
    );
    res.status(200).json({error:false, result: existingUser, token });
  } catch (err) {
    console.log("Error is", err);
    res.status(500).json({error:true, message: "Something's wrong" });
    console.log(err.message);
  }
};
