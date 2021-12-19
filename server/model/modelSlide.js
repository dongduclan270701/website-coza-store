const mongoose = require("mongoose");

var schemaSlide = new mongoose.Schema({
    titleSlider:{
        type:String,
        required:true
    },
    contentSlider:{
        type:String,
        required:true
    },
    imageSlider:{
        type:Array,
        required:true
    },
    categorySlider:{
        type:String,
        required:true
    },
    statusSlider:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('slidedb',schemaSlide);