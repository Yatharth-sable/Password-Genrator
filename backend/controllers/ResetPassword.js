const User = require("../models/User");
const crypto = require("crypto");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const {ResetTemplate} = require("../email/templates/ResetPasswordTemplet")
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const user = User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for ResetPasswordToken",
      });
    }

    // genrate the token
    const token = crypto.randomUUID();

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      }
    );

    if (updateDetails === null) {
      return res.status(404).json({
        success:false,
        message:"User Not found"
      })
    }

    // createing url
    const url = `http://localhost:3000/update-password/${token}`;

    await mailsender(
      email,
      "Password Reset",
      ResetTemplate(url)
      // `Your Link for password Reset is ${url} Valid for 5 Minutes only`,
    );

    return res.status(200).json({
      success:true,
      message:url
    })

  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to genrated Password token",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
 
    // password and confirm password
    if (confirmPassword !== password) {
      return res.status(403).json({
        success: false,
        message: "confirm password and password does not match",
      });
    }

    // get the userdetails from db using token
    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check if the token is expire or not
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(404).json({
        success: false,
        message: "Token is expired please regenrate the password",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    userDetails.password = hashedPassword;
    userDetails.token = token;
    userDetails.resetPasswordExpires = undefined;

    await userDetails.save();

 
    return res.status(200).json({
      success:true,
      message:"Password Successfully Reset"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to genrated Password token",
    });
  }
};
