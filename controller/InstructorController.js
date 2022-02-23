
const Course = require("../model/courseModel")
const InstructorModel = require("../model/InstructorModel")
exports.createInstructor=(req,res)=>{
    const instructorDetails=req.body
    InstructorModel.findOne({email:instructorDetails.email}).then(foundInstructor=>{
        if(foundInstructor){
            res.status(409).json({error:true,data:'Email is Already in Use By an Instructor'})
        }
        else{
            let newInstructor=new InstructorModel({...instructorDetails})
            newInstructor.save().then(saved=>{
                res.json({error:false,data: "Instructor Added"})
            })
        }
    }).catch(err=>{
        res.status(503).json({error:true,data:"something went wrong",errMsg:err})
    })
}
exports.updateInstructor=(req,res)=>{
    const instructorDetails=req.body
    const {id}=req.params
    InstructorModel.findByIdAndUpdate(id,{...instructorDetails}).then(updated=>{
        res.json({error:false,data: "Instructor Updated",updatedData:updated})
    }).catch(err=>{
        res.status(503).json({error:true,data:"something went wrong",errMsg:err})
    })
}
exports.getAllInstructor=(req,res)=>{
    InstructorModel.find({}).sort({_id:-1}).then(foundInstructor=>{
        res.json({error:false,data:foundInstructor,count:foundInstructor.length})
    }).catch(err=>{
        res.status(503).json({error:true,data:"something went wrong",errMsg:err})

    })
}
exports.getInstructorById=(req,res)=>{
    InstructorModel.findById(req.params.id).sort({_id:-1}).then(foundInstructor=>{
        res.json({error:false,data:foundInstructor})
    }).catch(err=>{
        res.status(503).json({error:true,data:"something went wrong",errMsg:err})

    })
}
exports.deleteInstructor=(req,res)=>{
    InstructorModel.findByIdAndDelete(req.params.id).then(deleted=>{
        deleteInstructorFromCourse(req.params.id)
        res.json({error:false,data:'Deleted Successfully'})
    }).catch(err=>{
        res.status(503).json({error:true,data:"something went wrong",errMsg:err})

    })
}
const deleteInstructorFromCourse=async(id)=>{
    try {
      let response = await Course.updateMany({ instructor: id }, { $set: { instructor: null} })
      console.log(response)
  } catch (error) {
      console.log(error)
  }
  }