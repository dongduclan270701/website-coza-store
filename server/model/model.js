const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    code: {
        type:String,
        required:true,
        unique:true
    },
    nameProduct:{
        type:String,
        required: true,
    },
    price: {
        type:Number,
        required: true
    },
    quanlity: {
        type:Number,
        required: true
    },
    image: {
        type:Array,
        required: true
    },
    additional_information : {
        weight:{
            type:Number,
            required: true
        },
        dimensions:{
            type:Number,
            required: true
        },
        material:{
            type:String,
            required: true
        },
        color:{
            type:Array,
            required: true
        },
        size:{
            type:Array,
            required: true
        },
        brand:{
            type:String,
            required: true
        },
        source:{
            type:String,
            required: true
        },
        machine_model:{
            type:String,
            required: true
        },
        shell_material:{
            type:String,
            required: true
        },
        wire_material:{
            type:String,
            required: true
        },
        glass_material:{
            type:String,
            required: true
        }
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('productdb',schema);

// const Userdb = mongoose.model('userdb',schema);


// module.exports = Userdb;