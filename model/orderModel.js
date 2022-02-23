const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
course:[ 
    {courseId:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},_id:false}
],
confirmPayment:{type:Boolean,default:false},
paymentDetails:{},
BuyedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
Affilicate:{code:{type:String},user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},
affilicateExist:{type:Boolean,default:false},
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
