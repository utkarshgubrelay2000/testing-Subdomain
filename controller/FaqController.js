/////////------ User SignUp ----////////////////
const Faq = require("../model/faqModel");
const Course = require("../model/courseModel");

exports.getAllFaqByCourse = (req, res) => {
    //console.log(req.body);
    Faq.find({ course: req.params.id }).sort({ questionNo: 1 }).then(found => {
        res.status(201).json({ error: false, data: found, FaqCount: found.length })

    }).catch(err => {
        res.status(503).json({ error: true, msg: "Something Went Wrong" })
    })
};
exports.getFaqById = (req, res) => {
    //console.log(req.body);
    Faq.findById(req.params.id).then(found => {
        res.status(201).json({ error: false, data: found, })

    }).catch(err => {
        res.status(503).json({ error: true, msg: "Something Went Wrong" })
    })
};
exports.createFaq = async (req, res) => {
  //  console.log(req.body);
    let faqDetails = req.body
    if(!faqDetails.questionNo){
   let response=await Faq.find({course:faqDetails.course}).sort({questionNo:-1}).limit(1)
faqDetails={  ...faqDetails,questionNo:response[0].questionNo+1}
    }
    let newFaq = new Faq({ ...faqDetails })
    newFaq.save().then(found => {
        console.log(found)
        Course.findByIdAndUpdate(faqDetails.course,{$push: { faq: found._id }}).then(saved=>{
            res.status(201).json({ error: false, data: 'Created',created:found })
        })

    }).catch(err => {

        res.status(503).json({ error: true, data: 'Something went wrong' })
    })

};
exports.editFaq = (req, res) => {
    //console.log(req.body);
    const  faqDetails = req.body

    Faq.findByIdAndUpdate(req.params.id, {...faqDetails}).then(found => {
        res.status(201).json({ error: false, data: "Updated" })

    }).catch(err => {
        res.status(503).json({ error: true, msg: "Something Went Wrong" })
    })
};

exports.deleteFaq = (req, res) => {
    //console.log(req.body);
    Faq.findByIdAndDelete(req.params.id).then(found => {
        deleteFaqFromCourse(req.params.id)
        res.status(201).json({ error: false, data: "Deleted" })

    }).catch(err => {
        res.status(503).json({ error: true, msg: "Something Went Wrong" })
    })
};
const deleteFaqFromCourse = async (id) => {
    try {
        let response = await Course.updateMany({ Faq: id }, { $pull: { "Faq": id } })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}