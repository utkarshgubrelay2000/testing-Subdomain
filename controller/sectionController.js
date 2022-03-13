const { ObjectId } = require('mongodb');
const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../services/subdomainServices");


exports.getSectionById = async (req, res) => {
   
    let {id} =req.params;
    
    // get subdomain
    id=ObjectId(id)
  
      try {
          console.log('start');
        //  let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          let sectionCollection=await baseModel.mongoConnect(req.subdomain,'homepage')

          const result =await sectionCollection.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
      //  res.status(500).json({error:true, data: "Origin host not Found" });

};
exports.getSection = async (req, res) => {
 

      try {
          let sectionCollection=await baseModel.mongoConnect(req.subdomain,'homepage')
          const result =await sectionCollection.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }
    
   
};

exports.addSection = async (req, res) => {
    const sectionData =req.body;
  
  
      try {
        
          let sectionCollection=await baseModel.mongoConnect(req.subdomain,'homepage')

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
    let {id} =req.params;
 

      try {
      //    let sectionCollection=await baseModel.mongoConnect(subdomain,section)
          let sectionCollection=await baseModel.mongoConnect(req.subdomain,'homepage')

          id=ObjectId(id)
          const result =await sectionCollection.findOneAndUpdate({_id:id},{$set:sectionData});
          console.log('result',result,id);
            res.json({ error:false, data: "Section updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
    
   
};
