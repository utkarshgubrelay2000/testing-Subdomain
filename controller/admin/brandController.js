const { ObjectId } = require('mongodb');
const baseModel=require('../../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../../services/subdomainServices");


exports.getbrandById = async (req, res) => {
   
    let {id} =req.params;
 
    id=ObjectId(id)
    
   
      try {
          
          let brandModel=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandModel.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
exports.getbrand = async (req, res) => {
  
      try {
          let brandModel=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandModel.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }


    

};

exports.addbrand = async (req, res) => {
    const brandData =req.body;
   

  
      try {
          let brandModel=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandModel.insertOne({
              ...brandData,
            });
            res.json({ error:false, data: "brand created successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
    

};
exports.editbrand = async (req, res) => {
    const brandData =req.body;
    let {id} =req.params;
 
      try {
          let brandModel=await baseModel.mongoConnect(subdomain,"brand")
          id=ObjectId(id)
          const result =await brandModel.findOneAndUpdate({_id:id},{$set:brandData});
          console.log('result',result,id);
            res.json({ error:false, data: "brand updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
