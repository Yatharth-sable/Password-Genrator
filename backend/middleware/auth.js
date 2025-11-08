const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async (req, res,next) => {
  try {
    const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
      req.body.token ||
      req.cookies.token
      
      
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("this is decode",decode);
      req.user = decode;
    } 
    
    catch (err) {
      console.log(err.message)
      return res.status(401).json({
        success: false,
        message: "Token is insvalid",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      successss: false,
      message: err.message,
    });
  }
};