const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")


const OTPSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
    type:Date,
    default:Date.now,
    expires:5*60
  },
},
{ timestamps: true }
)

//async function to send the email
const OTP = mongoose.model("OTP",OTPSchema)
module.exports = OTP;