const mongoose = require("mongoose");
const InstructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },bio: {
    type: String,
 
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    required: true,
    type: Number,
  },

  otp: {
    type: String,
  },
  ResetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  }
,imageUrl:{
  type:String
},
socialMedia:{twitter:String,instagram:String,linkedin:String}

});

const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;
