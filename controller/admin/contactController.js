const e = require('express');
const { ObjectId } = require('mongodb');
const baseModel=require('../../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../../services/subdomainServices");


exports.getcontactById = async (req, res) => {
 
    let {id} =req.params;
 
   
    // get subdomain
    id=ObjectId(id)
    
    // if(await checkSubDomainExist(subdomain))
    // return res.status(404).json({error:true, message: "No subdomain found with in Database" });

   
      try {
          console.log('start');
          let contactModel=await baseModel.mongoConnect(req.subdomain,"contact")
          const result =await contactModel.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }

}

exports.getcontact = async (req, res) => {
 
   



   
      try {
          let contactModel=await baseModel.mongoConnect(req.subdomain,"contact")
          const result =await contactModel.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }
        

};

exports.addcontact = async (req, res) => {
    const contactData =req.body;
   

   
    

      try {
          let contactModel=await baseModel.mongoConnect(req.subdomain,"contact")
          const result =await contactModel.insertOne({
              ...contactData,
            });
            res.json({ error:false, data: "contact created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
exports.editcontact = async (req, res) => {
    const contactData =req.body; 
    let {id} =req.params;
   
   
  
   
      try {
          let contactModel=await baseModel.mongoConnect(req.subdomain,"contact")
          id=ObjectId(id)
          const result =await contactModel.findOneAndUpdate({_id:id},{$set:contactData});
          console.log('result',result,id);
            res.json({ error:false, data: "contact updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
