const { ObjectId } = require('mongodb');
const baseModel=require('../../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../../services/subdomainServices");

exports.getMyGroups = async (req, res) => {
 
    let userId=ObjectId(req.userId)
  console.log(userId)
      try {
        
let subdomain=await getSubDomain(req.get('host'))
if(checkSubDomainExist(subdomain)){
          let groupModel=await baseModel.mongoConnect(req.subdomain,'group')
/// project name only
          const result =await groupModel.find({'students':userId}, {
            projection: { students: 0 }
        }).toArray()

          console.log('stop');

            res.json({ error:false, data: result });
        } else{
            res.status(500).json({error:true, data: "Origin host not Found" });
        }
      //  res.status(500).json({error:true, data: "Origin host not Found" });
    }
    catch(error){
        res.status(500).json({error:true, data: error.message });
    }
};
exports.getSection = async (req, res) => {

let subdomain=await getSubDomain(req.get('origin'))
// check for localhost'
console.log('subdomain',subdomain);

if(subdomain=='localhost' && subdomain){
    return res.json({ error:true, data: "No Subdomain" });
}
else if(checkSubDomainExist(subdomain)){

    try {
        let sectionModel=await baseModel.mongoConnect(subdomain,'homepage')
        const result =await sectionModel.find({}).toArray()
        res.json({ error:false, data: result });
    } catch (error) {
        
        res.status(500).json({error:true, data: error.data });
    }
}
else{
    res.status(500).json({error:true, data: "Origin host not Found" });
}
    
   
};