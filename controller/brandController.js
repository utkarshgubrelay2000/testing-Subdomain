const { ObjectId } = require('mongodb');
const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../services/subdomainServices");


exports.getbrandById = async (req, res) => {
    if(req.get('host')){
    let {id} =req.params;
    
    let subdomain=await getSubDomain(req.get('host'))
    // get subdomain
    id=ObjectId(id)
    
    // if(await checkSubDomainExist(subdomain))
    // return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          console.log('start');
          let brandCollection=await baseModel.mongoConnect(subdomain,"brand")
          const result =await brandCollection.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }}
        else 
        return res.json({ error:true, data: "Origin host not found" });

};
exports.getbrand = async (req, res) => {
    if(req.get('host')){
    let subdomain=await getSubDomain(req.get('host'))
    console.log('subdomain',subdomain);

    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let brandCollection=await baseModel.mongoConnect(subdomain,"brand")
          const result =await brandCollection.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }


    }
else{
    res.json({ error:true, data: "Origin host not found" });
}
};

exports.addbrand = async (req, res) => {
    const brandData =req.body;
    if(req.get('host')){

    let subdomain=await getSubDomain(req.get('host'))
    console.log('subdomain',await checkSubDomainExist(subdomain));

    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });

      try {
          let brandCollection=await baseModel.mongoConnect(subdomain,"brand")
          const result =await brandCollection.insertOne({
              ...brandData,
            });
            res.json({ error:false, data: "brand created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
    }
        else{
            res.json({ error:true, data: "Origin host not found" });
        }

};
exports.editbrand = async (req, res) => {
    const brandData =req.body;
    let {id} =req.params;
    if(req.get('host')){
    let subdomain=await getSubDomain(req.get('host'))
    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let brandCollection=await baseModel.mongoConnect(subdomain,"brand")
          id=ObjectId(id)
          const result =await brandCollection.findOneAndUpdate({_id:id},{$set:brandData});
          console.log('result',result,id);
            res.json({ error:false, data: "brand updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }}
        else
        return res.json({ error:true, data: "Origin host not found" });

};
