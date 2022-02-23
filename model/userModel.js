const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  fname: {
    type: String,

  },
   lname: {
    type: String,

  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    required: true,
    type: Number,
  },
  affiliateCode:String,
  // For forgot password purpose
  otp: {
    type: String,
  },
  ResetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  }
  ,myCart:[
    {
      _id:false,
      date:{type:Date},
      courseId:{type:mongoose.Schema.Types.ObjectId,ref:'Course'}
    }
  ]


});

const Student = mongoose.model("User", StudentSchema);
module.exports = Student;
