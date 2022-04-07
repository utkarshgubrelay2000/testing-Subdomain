const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");

exports.getCouponById = async (req, res) => {
  let { id } = req.params;

  // get subdomain
  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let couponCollection = await baseModel.mongoConnect(
        req.subdomain,
        "coupon"
      );

      const result = await couponCollection.findOne({ _id: id });
      console.log("stop");

      res.json({ error: false, data: result });
    
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getCoupon = async (req, res) => {
  let subdomain = req.subdomain
  console.log("subdomain", subdomain);
  // check for localhost'
  
    try {
      let couponCollection = await baseModel.mongoConnect(
        subdomain,
        "coupon"
      );
      const result = await couponCollection.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  
};
exports.addCoupon = async (req, res) => {
  const couponData =req.body;


    try {
      
        let couponCollection=await baseModel.mongoConnect(req.subdomain,'coupon')

        const result =await couponCollection.insertOne({
            ...couponData
          });
          res.json({ error:false, data: "coupon created successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
 



};
exports.editCoupon = async (req, res) => {
  const couponData =req.body;
  let {id} =req.params;


    try {
    //    let couponCollection=await baseModel.mongoConnect(subdomain,coupon)
        let couponCollection=await baseModel.mongoConnect(req.subdomain,'coupon')

        id=ObjectId(id)
        const result =await couponCollection.findOneAndUpdate({_id:id},{$set:couponData});
        console.log('result',result,id);
          res.json({ error:false, data: "coupon updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteCoupon = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let couponCollection=await baseModel.mongoConnect(req.subdomain,'coupon')
        id=ObjectId(id)
        const result =await couponCollection.findOneAndDelete({_id:id});
        console.log('result',result,id);
          res.json({ error:false, data: "coupon deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}
