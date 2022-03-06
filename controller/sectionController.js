const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubdomainExist } = require("../services/subdomainServices");


exports.getSectionById = async (req, res) => {
    const sectionData =req.body;
    const {section,id} =req.params;
    let subdomain=await getSubDomain(req.get('origin'))
    if(!checkSubdomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          const result =await sectionCollection.updateOne({_id:id},{...sectionData});
            res.json({ error:false, data: "Section created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }

};
exports.getSection = async (req, res) => {
    const {section} =req.params;
    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',subdomain);
   if(!checkSubdomainExist(subdomain))
        return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          const result =await sectionCollection.find({});
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }

};

exports.addSection = async (req, res) => {
    const sectionData =req.body;
    const {section} =req.params;
    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',subdomain);
    if(!checkSubdomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });

      try {
          let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          const result =await sectionCollection.insertOne({
              ...sectionData,
            });
            res.json({ error:false, data: "Section created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }

};
exports.editSection = async (req, res) => {
    const sectionData =req.body;
    const {section,id} =req.params;
    let subdomain=await getSubDomain(req.get('origin'))
    if(!checkSubdomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          const result =await sectionCollection.updateOne({_id:id},{...sectionData});
            res.json({ error:false, data: "Section created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }

};
