const e = require('express');
const { ObjectId } = require('mongodb');
const baseModel=require('../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../services/subdomainServices");


exports.getcontactById = async (req, res) => {
 
    let {id} =req.params;
    if(req.get('origin')){
    let subdomain=await getSubDomain(req.get('origin'))
    // get subdomain
    id=ObjectId(id)
    
    // if(await checkSubDomainExist(subdomain))
    // return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          console.log('start');
          let contactCollection=await baseModel.mongoConnect(subdomain,"contact")
          const result =await contactCollection.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }

}
else
 return res.status(404).json({error:true, message: "No subdomain found with in Host Url" });
};
exports.getcontact = async (req, res) => {
  if(req.get('origin')){
    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',subdomain);

    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let contactCollection=await baseModel.mongoConnect(subdomain,"contact")
          const result =await contactCollection.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }}
        else
 return res.status(404).json({error:true, message: "No subdomain found with in Host Url" });

};

exports.addcontact = async (req, res) => {
    const contactData =req.body;
    if(req.get('origin')){

    let subdomain=await getSubDomain(req.get('origin'))
    console.log('subdomain',await checkSubDomainExist(subdomain));

    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });

      try {
          let contactCollection=await baseModel.mongoConnect(subdomain,"contact")
          const result =await contactCollection.insertOne({
              ...contactData,
            });
            res.json({ error:false, data: "contact created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }}
        else
        return res.status(404).json({error:true, message: "No subdomain found with in Host Url" });

};
exports.editcontact = async (req, res) => {
    const contactData =req.body; 
    let {id} =req.params;
    if(req.get('origin')){
    let subdomain=await getSubDomain(req.get('origin'))
    if(await checkSubDomainExist(subdomain))
    return res.status(404).json({error:true, message: "No subdomain found with in Database" });
    if(subdomain=='localhost')
      return  res.status(200).json({error:true, data: "Wrong Url" });
      try {
          let contactCollection=await baseModel.mongoConnect(subdomain,"contact")
          id=ObjectId(id)
          const result =await contactCollection.findOneAndUpdate({_id:id},{$set:contactData});
          console.log('result',result,id);
            res.json({ error:false, data: "contact updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }}
        else 
        return res.status(404).json({error:true, message: "No subdomain found with in Host Url" });

};
