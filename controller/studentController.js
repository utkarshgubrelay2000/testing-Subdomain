const { ObjectId } = require('mongodb');
const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../services/subdomainServices");

exports.getSectionById = async (req, res) => {
   
    let {id} =req.params;
    
    // get subdomain
    id=ObjectId(id)
  
      try {
        
let subdomain=await getSubDomain(req.get('origin'))
if(checkSubDomainExist(subdomain)){
          let sectionCollection=await baseModel.mongoConnect(req.subdomain,'homepage')

          const result =await sectionCollection.findOne({_id:id});
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
        let sectionCollection=await baseModel.mongoConnect(subdomain,'homepage')
        const result =await sectionCollection.find({}).toArray()
        res.json({ error:false, data: result });
    } catch (error) {
        
        res.status(500).json({error:true, data: error.data });
    }
}
else{
    res.status(500).json({error:true, data: "Origin host not Found" });
}
    
   
};