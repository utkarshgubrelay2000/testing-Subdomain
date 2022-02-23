const Course = require("../model/courseModel")
const User = require("../model/userModel")

exports.addNewCourse = (req, res) => {
    let courseDetails = req.body
    console.log(courseDetails.subcategory)
    Course.findOne({ title: courseDetails.title }).then(foundCourse => {
        if (foundCourse) {
            res.status(409).json({ error: true, data: 'Course with same Name Already Exist' })
        }
        else {
            try {
                let courseId = courseDetails.title.replace(/\s/g, "-")
                courseDetails = { ...courseDetails, courseId }
                let newCourse = new Course({ ...courseDetails })
                newCourse.save().then(saved => {
                    res.json({ error: false, data: "Successfully Created A Course", course: saved })
                })
            } catch (error) {
                console.log(error)
            }
        }
    }).catch(err => {
        res.status(503).json({ error: true, data: "something went wrong", errMsg: err })
    })

}
exports.updateCourse = (req, res) => {
    let courseDetails = req.body

    let courseId
    if (courseDetails.title) {
        courseId = courseDetails.title.replace(/\s/g, "-")
        courseDetails = { ...courseDetails, courseId }
    }
    Course.findByIdAndUpdate(req.params.courseId, { ...courseDetails }).then(async foundCourse => {
        res.json({ data: "Successs", error: false })
    }).catch(err => {
        res.status(503).json({ error: true, data: "something went wrong", errMsg: err })
    })


    //     let String="123 hd 89"
    //   let l=  String.replace(/\s/g,"-")
    //     res.json(l)
}

exports.getAllCourses = (req, res) => {
    Course.find({$and:[{category:{$ne:null}},{instructor:{$ne:null}}]}).populate('category').populate({ model: 'Instructor', path: "instructor" })
        .populate({ model: 'Course', path: "recommendedCourse" }).sort({ _id: -1 }).then(Courses => {
            res.json({count:Courses.length, data: Courses, error: false })
        }).catch(err => {
            res.status(503).json({ error: true, data: "something went wrong", errMsg: err })
        })
}
exports.getCourseById = (req, res) => {
    Course.findById(req.params.courseId).populate({ model: 'Faq', path: "faq" })
    .populate('category').populate({ model: 'Course', path: "recommendedCourse" }).populate({ model: 'Instructor', path: "instructor" }).then(Courses => {
        res.json({ data: Courses, error: false })

    }).catch(err => {
        res.status(503).json({ error: true, data: "something went wrong", errMsg: err })

    })
}
exports.deleteCourse = (req, res) => {
    Course.findByIdAndDelete(req.params.courseId).then(Courses => {
        deleteCourseFromRecommandedCourses(req.params.courseId)
        res.json({ data: "Deleted Course", error: false })
    }).catch(err => {
        res.status(503).json({ error: true, data: "something went wrong", errMsg: err })

    })
}
exports.setCourseTrending = (req, res) => {
    Course.findByIdAndUpdate(req.params.id, { trending: req.body.trending }).then(foundCourse => {
        if (foundCourse) {
            res.json({ data: "Trending", error: false })

        }
        else {
            res.status(404).json('Course not found')
        }
    }).catch(err => {
        res.status(503).json({ error: true, data: "something went wrong", errMsg: err })

    })
}
const deleteCourseFromRecommandedCourses = async (id) => {
    try {
        let response = await Course.updateMany({ recommendedCourse: id }, { $pull: { "recommendedCourse": id } })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
exports.getAllCourseWithoutCategoryAndInstructor=(req,res)=>{
    Course.find({$or:[{category:{$eq:null}},{instructor:{$eq:null}}]}).populate('category').populate({ model: 'Instructor', path: "instructor" })
        .populate({ model: 'Course', path: "recommendedCourse" }).sort({ _id: -1 }).then(Courses => {
            res.json({count:Courses.length,data: Courses, error: false })
        }).catch(err => {
            res.status(503).json({ error: true, data: "something went wrong", errMsg: err })
        })
}

exports.postUploadImage = (req, res, next) => {
    try{
        if(!req.uploadError){
            console.log('req.uploadSuccess.files.image: ', req.uploadSuccess.files.upl);
            if(req.uploadSuccess.files.upl){
                req.uploadSuccess.files.upl.forEach(image => {
                    res.status(201).json({
                        msg:req.uploadSuccess.msg,
                        imageUrl:image.location
                    });
                });
            }
                
            else{
                res.status(404).json({
                    msg:'Image not found',
                    data:'No image were found uploaded'
                });
            }
        }
        else{
            if(req.uploadError.errorCode === 1){
                res.status(422).json({
                    msg:'Image size is too large',
                    maxSize:'2MB'
                });
            }else{
                res.status(500).json({
                    msg:req.uploadError.msg
                });
            }
        }
    }catch(err){
        
    }
}