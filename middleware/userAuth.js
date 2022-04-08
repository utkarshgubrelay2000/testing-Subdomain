const jwt = require("jsonwebtoken");


const secret = 'test';

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId=decodedData.id
   
     
      next();
    } else {
      decodedData = jwt.decode(token);
      req.userId=decodedData.id
      req.subdomain=decodedData.subdomain

 
  next();
    }
  } catch (error) {
    console.log(error);
 //  let ress= await redis.del("token"+token);
  // console.log(ress);
    res.status(403).json('Token Expired')
  }
};


