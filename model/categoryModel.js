const mongoose = require("mongoose")
const CategorySchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subCategory:[{subCategory_name:{type:String}}]
    
    
})

const Category = mongoose.model("Category",CategorySchema)
module.exports = Category