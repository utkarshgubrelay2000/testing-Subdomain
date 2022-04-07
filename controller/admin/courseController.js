const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");
const {
  getSubDomain,
  checkSubDomainExist,
} = require("../../services/subdomainServices");

exports.getCourseById = async (req, res) => {
  let { id } = req.params;

  // get subdomain
  id = ObjectId(id);

  try {
    let subdomain = req.subdomain
    console.log("subdomain", subdomain);
  
      let courseCollection = await baseModel.mongoConnect(
        req.subdomain,
        "course"
      );

      const result = await courseCollection.findOne({ _id: id });
      console.log("stop");

      res.json({ error: false, data: result });
    
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getCourse = async (req, res) => {
  let subdomain = req.subdomain
  console.log("subdomain", subdomain);
  // check for localhost'
  
    try {
      let courseCollection = await baseModel.mongoConnect(
        subdomain,
        "course"
      );
      const result = await courseCollection.aggregate([
        {
          $lookup: {
            from: "Category",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryId",},
          
            $unwind:  "$categoryId",
            
           // },
          },
          ]).toArray()
   //   const result = await courseCollection.find({}).toArray().populate('categoryId')
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.message });
    }
  
};
exports.addCourse = async (req, res) => {
  const courseData =req.body;

let categoryId=ObjectId(courseData.categoryId);
    try {
      
        let courseCollection=await baseModel.mongoConnect(req.subdomain,'course')

        const result =await courseCollection.insertOne({
            ...courseData,categoryId
          });
          res.json({ error:false, data: "course created successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
 



};
exports.editCourse = async (req, res) => {
  const courseData =req.body;
  let {id} =req.params;
if(courseData.categoryId){
  let categoryId=ObjectId(courseData.categoryId);
  courseData.categoryId=categoryId;
}

    try {
    //    let courseCollection=await baseModel.mongoConnect(subdomain,course)
        let courseCollection=await baseModel.mongoConnect(req.subdomain,'course')

        id=ObjectId(id)
        const result =await courseCollection.findOneAndUpdate({_id:id},{$set:courseData});
        console.log('result',result,id);
          res.json({ error:false, data: "course updated successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
};
exports.deleteCourse = async (req, res) => {
  const {id} =req.params;
 
    try {
 
        let courseCollection=await baseModel.mongoConnect(req.subdomain,'course')
        id=ObjectId(id)
        const result =await courseCollection.findOneAndDelete({_id:id});
        console.log('result',result,id);
          res.json({ error:false, data: "course deleted successfully" });
      } catch (error) {

          res.status(500).json({error:true, data: error.message });
      }
  
 
}
