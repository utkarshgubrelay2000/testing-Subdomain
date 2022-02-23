const mongoose = require("mongoose");
const TestimonialsSchema = new mongoose.Schema({
title:String,
description:String,
img:String
});

const Testimonial = mongoose.model("Testimonial", TestimonialsSchema);
module.exports = Testimonial;
