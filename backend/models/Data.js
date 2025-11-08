const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
