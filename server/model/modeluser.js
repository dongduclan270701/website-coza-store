const mongoose = require("mongoose");

var schemaUser = new mongoose.Schema({
    firtsName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('userdb',schemaUser);