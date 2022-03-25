const { ObjectId } = require('mongodb');
const baseModel=require('../../model/baseModel')
const { getSubDomain,checkSubDomainExist } = require("../../services/subdomainServices");


exports.getbrandById = async (req, res) => {
   
    let {id} =req.params;
 
    id=ObjectId(id)
    
   
      try {
          
          let brandCollection=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandCollection.findOne({_id:id});
          console.log('stop');

            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
exports.getbrand = async (req, res) => {
  
      try {
          let brandCollection=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandCollection.find({}).toArray()
            res.json({ error:false, data: result });
        } catch (error) {

            res.status(500).json({error:true, data: error.data });
        }


    

};

exports.addbrand = async (req, res) => {
    const brandData =req.body;
   

  
      try {
          let brandCollection=await baseModel.mongoConnect(req.subdomain,"brand")
          const result =await brandCollection.insertOne({
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
          let brandCollection=await baseModel.mongoConnect(subdomain,"brand")
          id=ObjectId(id)
          const result =await brandCollection.findOneAndUpdate({_id:id},{$set:brandData});
          console.log('result',result,id);
            res.json({ error:false, data: "brand updated successfully" });
        } catch (error) {

            res.status(500).json({error:true, data: error.message });
        }
};
