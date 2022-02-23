const mongoose = require("mongoose");
const FaqSchema = new mongoose.Schema({
course:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},
question:String,
answer:String,
questionNo:Number
});

const FaqModel = mongoose.model("Faq", FaqSchema);
module.exports = FaqModel;
