const { ObjectId } = require('mongodb');
const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../services/subdomainServices");


exports.getSectionById = async (req, res) => {
    if(req.get('origin')){
    let {id} =req.params;
    let subdomain=await getSubDomain(req.get('origin'))
    // get subdomain
    id=ObjectId(id)
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          console.log('start');
        //  let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          let sectionCollection=await baseModel.mongoConnect(subdomain,'homepage')

          const result =await sectionCollection.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }}
        res.status(500).json({error:true, data: "Origin host not Found" });

};
exports.getSection = async (req, res) => {
   if(req.get('origin')){

  
    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',subdomain);

    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let sectionCollection=await baseModel.mongoConnect(subdomain,'homepage')
          const result =await sectionCollection.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }
    }
    res.status(500).json({error:true, data: "Origin host not Found" });

};

exports.addSection = async (req, res) => {
    const sectionData =req.body;
    if(req.get('origin')){
    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',await checkSubDomainExist(subdomain));

    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });

      try {
        
          let sectionCollection=await baseModel.mongoConnect(subdomain,'homepage')

          const result =await sectionCollection.insertOne({
              ...sectionData,
            });
            res.json({ error:false, data: "Section created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
    }
    else{
        res.status(500).json({error:true, data: "Origin host not Found" });
    }



};
exports.editSection = async (req, res) => {
    const sectionData =req.body;
    let {id} =req.params;
    if(req.get('origin')){
    let subdomain=await getSubDomain(req.get('origin'))
    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
      //    let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          let sectionCollection=await baseModel.mongoConnect(subdomain,'homepage')

          id=ObjectId(id)
          const result =await sectionCollection.findOneAndUpdate({_id:id},{$set:sectionData});
          console.log('result',result,id);
            res.json({ error:false, data: "Section updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
    }
    else{
        res.status(500).json({error:true, data: "Origin host not Found" });
    }
};
