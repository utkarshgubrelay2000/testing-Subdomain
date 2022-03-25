const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");
const {
  getSubDomain,
  checkSubDomainExist,
} = require("../../services/subdomainServices");

exports.getCategoryById = async (req, res) => {
  let { id } = req.params;

  // get subdomain
  id = ObjectId(id);

  try {
    let subdomain = await getSubDomain(req.get("origin"));
    if (checkSubDomainExist(subdomain)) {
      let categoryCollection = await baseModel.mongoConnect(
        req.subdomain,
        "Category"
      );

      const result = await categoryCollection.findOne({ _id: id });
      console.log("stop");

      res.json({ error: false, data: result });
    } else {
      res.status(500).json({ error: true, data: "Origin host not Found" });
    }
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getCategory = async (req, res) => {
  let subdomain = await getSubDomain(req.get("origin"));
  // check for localhost'
  console.log("subdomain", subdomain);

  if (subdomain == "localhost" && subdomain) {
    return res.json({ error: true, data: "No Subdomain" });
  } else if (checkSubDomainExist(subdomain)) {
    try {
      let categoryCollection = await baseModel.mongoConnect(
        subdomain,
        "Category"
      );
      const result = await categoryCollection.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  } else {
    res.status(500).json({ error: true, data: "Origin host not Found" });
  }
};
exports.addCategory = async (req, res) => {
  const categoryData =req.body;


    try {
      
        let categoryCollection=await baseModel.mongoConnect(req.subdomain,'Category')

        const result =await categoryCollection.insertOne({
            ...categoryData,
          });
          res.json({ error:false, data: "category created successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
 



};
exports.editCategory = async (req, res) => {
  const categoryData =req.body;
  let {id} =req.params;


    try {
    //    let categoryCollection=await baseModel.mongoConnect(subdomain,category)
        let categoryCollection=await baseModel.mongoConnect(req.subdomain,'Category')

        id=ObjectId(id)
        const result =await categoryCollection.findOneAndUpdate({_id:id},{$set:categoryData});
        console.log('result',result,id);
          res.json({ error:false, data: "category updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteCategory = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let categoryCollection=await baseModel.mongoConnect(req.subdomain,'Category')
        id=ObjectId(id)
        const result =await categoryCollection.findOneAndDelete({_id:id});
        console.log('result',result,id);
          res.json({ error:false, data: "category deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}
