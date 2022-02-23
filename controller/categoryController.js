/////////------ User SignUp ----////////////////
const Category = require("../model/categoryModel");
const Course = require("../model/courseModel");

exports.getAllCategory = (req, res) => {
  //console.log(req.body);
  Category.find({}).populate('categoryObject').sort({ _id: -1 }).then(found => {
    res.status(201).json({ error: false, data: found, CategoryCount: found.length })

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" })
  })
};
exports.getCategoryById = (req, res) => {
  //console.log(req.body);
  Category.findById(req.params.id).populate('categoryObject').then(found => {
    res.status(201).json({ error: false, data: found,})

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" })
  })
};
exports.createCategory = (req, res) => {
  //console.log(req.body);
  const { name,subCategory } = req.body
  Category.findOne({name:name}).then(found=>{
if(!found){

  let newCategory = new Category({
    name: name,
    subCategory:subCategory
  })
  newCategory.save().then(found => {
    res.status(201).json({ error: false, data: 'Created' })
    
  })
}
else{
  res.status(403).json({ error: true, data: 'Already Present' })

}
    }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" })
  })
};
exports.editCategory= (req, res) => {
  //console.log(req.body);
  const { name,subCategory } = req.body

    Category.findByIdAndUpdate(req.params.id,{
    name: name,
    subCategory:subCategory
 
  }).then(found => {
    res.status(201).json({ error: false, data: "Updated"})

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" })
  })
};
exports.addSubCategory= (req, res) => {
  //console.log(req.body);
  const { categoryId } = req.params
  const { subCategoryName } = req.body
    Category.findByIdAndUpdate(categoryId,{$push: { subCategory: {subCategory_name:subCategoryName} }}).then(found => {
     
    res.status(201).json({ error: false, data: "Updated"})

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" ,errMsg:err})
  })
};
exports.removeSubCategory= (req, res) => {
  //console.log(req.body);
  const { subcategoryId } = req.params

    Category.findOneAndUpdate({"subCategory._id":subcategoryId},{$pull: { "subCategory":{_id:subcategoryId} }}).then(found => {
     
    res.status(201).json({ error: false, data: "deleted"})

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" ,errMsg:err})
  })
};
exports.editSubCategory= (req, res) => {
  //console.log(req.body);
  const { subCategoryId } = req.params
  const { subCategoryName } = req.body
console.log(subCategoryId)
    Category.findOne({"subCategory._id":subCategoryId}).then(found => {
      found.subCategory.map((element,index)=>{
        if(element._id==subCategoryId){
          found.subCategory[index]={subCategory_name:subCategoryName,_id:element._id}
          found.save()
        }
      })
    res.status(201).json({ error: false, data: "Updated"})

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" ,errMsg:err})
  })
};
exports.deleteCategory = (req, res) => {
  //console.log(req.body);
  Category.findByIdAndDelete(req.params.id).then(found => {
    deleteCategoryFromCourse(req.params.id)
    res.status(201).json({ error: false,data:"Deleted"  })

  }).catch(err => {
    res.status(503).json({ error: true, msg: "Something Went Wrong" })
  })
};
const deleteCategoryFromCourse=async(id)=>{
  try {
    let response = await Course.updateMany({ category: id }, { $set: { category: null} })
    console.log(response)
} catch (error) {
    console.log(error)
}
}