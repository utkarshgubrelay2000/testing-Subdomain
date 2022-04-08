const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");

exports.getEventById = async (req, res) => {
  let { id } = req.params;

  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let eventModel = await baseModel.mongoConnect(
        req.subdomain,
        "event"
      );

      const result = await eventModel.findOne({ _id: id });
  

      res.json({ error: false, data: result });
    
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getEvent = async (req, res) => {
  let subdomain = req.subdomain
  console.log("subdomain", subdomain);
  // check for localhost'
  
    try {
      let eventModel = await baseModel.mongoConnect(
        subdomain,
        "event"
      );
      const result = await eventModel.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  
};
exports.addEvent = async (req, res) => {
  const eventData =req.body;
//console.log(req.subdomain)
    try {
      
        let eventModel=await baseModel.mongoConnect(req.subdomain,'event')

        const result =await eventModel.insertOne({
            ...eventData
          });
          res.json({ error:false, data: "Event created successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
 



};
exports.editEvent = async (req, res) => {
  const EventData =req.body;
  let {id} =req.params;
try{
        let eventModel=await baseModel.mongoConnect(req.subdomain,'event')

        id=ObjectId(id)
        const result =await eventModel.findOneAndUpdate({_id:id},{$set:EventData});
        console.log('result',result,id);
          res.json({ error:false, data: "Event updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteEvent = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let eventModel=await baseModel.mongoConnect(req.subdomain,'event')
        id=ObjectId(id)
        const result =await eventModel.findOneAndDelete({_id:id});
        console.log('result',result);
          res.json({ error:false, data: "Event deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}

