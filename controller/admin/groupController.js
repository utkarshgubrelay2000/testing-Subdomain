const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");

exports.getGroupById = async (req, res) => {
  let { id } = req.params;

  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let groupModel = await baseModel.mongoConnect(
        req.subdomain,
        "group"
      );

      const result = await groupModel.findOne({ _id: id });
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
      let groupModel = await baseModel.mongoConnect(
        subdomain,
        "group"
      );
      const result = await groupModel.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  
};
exports.addGroup = async (req, res) => {
  const groupData =req.body;
//console.log(req.subdomain)
    try {
      
        let groupModel=await baseModel.mongoConnect(req.subdomain,'group')

        const result =await groupModel.insertOne({
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
        let groupModel=await baseModel.mongoConnect(req.subdomain,'group')

        id=ObjectId(id)
        const result =await groupModel.findOneAndUpdate({_id:id},{$set:groupData});
        console.log('result',result,id);
          res.json({ error:false, data: "group updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteGroup = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let groupModel=await baseModel.mongoConnect(req.subdomain,'group')
        id=ObjectId(id)
        const result =await groupModel.findOneAndDelete({_id:id});
        console.log('result',result);
          res.json({ error:false, data: "group deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}

exports.addGroupsToEvent = async (req, res) => {
  try { 
let {event,groups} = req.body;
event=ObjectId(event)
let subdomain = req.subdomain
  console.log(subdomain)
   
      let eventModel = await baseModel.mongoConnect(
        subdomain,
        "event"
      );
      let groupModel = await baseModel.mongoConnect(
        subdomain,
        "group"
      );


if(groups && groups.length>0){
  let groupIds=groups.map(group=>ObjectId(group))
  groups=groupIds

 await eventModel.findOneAndUpdate({_id:event},{$addToSet:{groups:{$each:groups}}},{multi:true})
 await groupModel.updateMany({_id:{$in:groups}},{$addToSet:{event:event}},{multi:true})

}
res.status(201).json({error:false,data:"Added"})
} catch (error) {
console.log(error)
  res.status(503).json({error:true,data:'Some Error Occured'})
      
}
};
exports.removeFromEvent = async (req, res) => {
  try { 
let {event,groupId} = req.body;
event=ObjectId(event)
let subdomain = req.subdomain

      let eventModel = await baseModel.mongoConnect(
        subdomain,
        "event"
      );
      let groupModel = await baseModel.mongoConnect(
        subdomain,
        "group"
      );




      groupId=ObjectId(groupId)

 await eventModel.findOneAndUpdate({_id:event},{$pull:{groups:groupId}},{multi:true})
 await groupModel.findOneAndUpdate({_id:groupId},{$pull:{event:event}},{multi:true})


res.status(201).json({error:false,data:"Removed"})
} catch (error) {
console.log(error)
  res.status(503).json({error:true,data:'Some Error Occured'})
      
}
};