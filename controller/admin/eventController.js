const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");

exports.getEventById = async (req, res) => {
  let { id } = req.params;

  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let eventCollection = await baseModel.mongoConnect(
        req.subdomain,
        "event"
      );

      const result = await eventCollection.findOne({ _id: id });
  

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
      let eventCollection = await baseModel.mongoConnect(
        subdomain,
        "event"
      );
      const result = await eventCollection.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  
};
exports.addEvent = async (req, res) => {
  const eventData =req.body;
//console.log(req.subdomain)
    try {
      
        let eventCollection=await baseModel.mongoConnect(req.subdomain,'event')

        const result =await eventCollection.insertOne({
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
        let eventCollection=await baseModel.mongoConnect(req.subdomain,'event')

        id=ObjectId(id)
        const result =await eventCollection.findOneAndUpdate({_id:id},{$set:EventData});
        console.log('result',result,id);
          res.json({ error:false, data: "Event updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteEvent = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let eventCollection=await baseModel.mongoConnect(req.subdomain,'event')
        id=ObjectId(id)
        const result =await eventCollection.findOneAndDelete({_id:id});
        console.log('result',result);
          res.json({ error:false, data: "Event deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}

