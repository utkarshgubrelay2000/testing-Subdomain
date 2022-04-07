const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");

exports.getGroupById = async (req, res) => {
  let { id } = req.params;

  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let groupCollection = await baseModel.mongoConnect(
        req.subdomain,
        "group"
      );

      const result = await groupCollection.findOne({ _id: id });
      console.log("stop");

      res.json({ error: false, data: result });
    
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getGroup = async (req, res) => {
  let subdomain = req.subdomain
  console.log("subdomain", subdomain);
  // check for localhost'
  
    try {
      let groupCollection = await baseModel.mongoConnect(
        subdomain,
        "group"
      );
      const result = await groupCollection.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  
};
exports.addGroup = async (req, res) => {
  const groupData =req.body;
//console.log(req.subdomain)
    try {
      
        let groupCollection=await baseModel.mongoConnect(req.subdomain,'group')

        const result =await groupCollection.insertOne({
            ...groupData
          });
          res.json({ error:false, data: "group created successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
 



};
exports.editGroup = async (req, res) => {
  const groupData =req.body;
  let {id} =req.params;
try{
        let groupCollection=await baseModel.mongoConnect(req.subdomain,'group')

        id=ObjectId(id)
        const result =await groupCollection.findOneAndUpdate({_id:id},{$set:groupData});
        console.log('result',result,id);
          res.json({ error:false, data: "group updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteGroup = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let groupCollection=await baseModel.mongoConnect(req.subdomain,'group')
        id=ObjectId(id)
        const result =await groupCollection.findOneAndDelete({_id:id});
        console.log('result',result);
          res.json({ error:false, data: "group deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}
