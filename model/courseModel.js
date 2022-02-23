const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
     title: { type: String, required: true },
     trending: { type: Boolean, default: false },
     courseId: String,
     price: Number,
     thumbnailImage: String,
     image_url: String,
     job_salary: String,
     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
     instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
     faq: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faq' }],
     description: String,
     subcategory: String,
     short_description: String,
     placement_assistance: String,
     benefits: String,
     includes: String,
     outcomes: Array,
     requirements: Array,
     level: String,
     language: String,
     projects: Array,
     projectTime: String,
     projectDuration: String,
     NoOfProjects: String,
     emiPrice:String,
     topics: [{
          _id: false, topicName: String, thumbnailImage: String, order: Number,
          SubTopic: [{
               _id: false,
               suborder: Number,
               subTopicName: String,
               thumbnailImage: String,
               lectures: [{
                    _id: false,
                    lectureorder: Number,
                    lectureName: String,
                    duration: String,
                    docUrl: String,
                    description: String,
               }]
          }]
     }],

     recommendedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true })

const Course = mongoose.model("Course", Schema);
module.exports = Course;
   //       topics :[
        //    { _id:false,
        //        topicName : String,
        //        topicDuration :String,
        //        subTopics :[
        //          { _id:false,
        //              subTopicName : String,
        //              duration :String,
        //              videoLink : String ,
        //             //  previewLink : String ,
        //              docUrl:String,
        //              description:String,
        //          }
        //       ]}],
        //  instructors :[
        //    {
        //     _id:false,
        //        name : String,
        //        position : String,
        //        company : String,
        //        imageLink : String     },
        // ]