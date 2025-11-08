const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },token:{
        type:String,
    },
        resetPasswordExpires:{
        type:Date, 
     },
    
},
	{ timestamps: true }
)

module.exports = mongoose.model("User",userSchema);