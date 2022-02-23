const testimonialModel=require('../model/testimonials')

exports.createTestimonial=(req,res)=>{
    const TestimonialDetails= req.body
            let newtestimonial=new testimonialModel({...TestimonialDetails})
            newtestimonial.save()
        res.json({ data: "Created testimonial", error: false })

        
}
exports.getAlltestimonials=(req,res)=>{
    testimonialModel.find({}).sort({_id:-1}).then(testimonials=>{
            res.json({ data: testimonials, error: false })
        
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}

exports.gettestimonialById=(req,res)=>{
    testimonialModel.findById(req.params.testimonialId).then(testimonial=>{
                  res.json({ data: testimonial, error: false })
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.deletetestimonial=(req,res)=>{
    testimonialModel.findByIdAndDelete(req.params.testimonialId).then(testimonials=>{
     
        res.json({ data: "Delete testimonial", error: false })

    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.updatetestimonial=(req,res)=>{
    const TestimonialDetails= req.body
    testimonialModel.findByIdAndUpdate(req.params.testimonialId,{...TestimonialDetails  }).then(foundtestimonial=>{
        res.json({ data: "Updated", error: false })

        
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
    
    
 
    }