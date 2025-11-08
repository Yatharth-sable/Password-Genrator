const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
// const { otpTemplate} = require("../email/templates/emailTemplate");
const otpGenerator = require("otp-generator");
const { otpTemplate } = require("../email/templates/emailTemplate");
const { passwordChange } = require("../email/templates/changePasswordTemplete");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    // check if the useralredy present
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already Exists",
      });
    }

    let otp;
    let result;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp }); // check if otp exists then they regenrate it
    } while (result);

    const mailResponse = await mailSender(
      email,
      "Verification Email is send",
      otpTemplate(otp)
    );

    if (mailResponse && mailResponse.messageId) {
      console.log("mail sent successfully");
    } else {
      console.log("mail failed to send");
    }

    // hashing the otp
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpPayload = { email, otp: hashedOTP };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return the response succesfully
    res.status(200).json({
      success: true,
      message: "Otp send successfully",
      otp,
    });
  } catch (err) {
    console.log("Failed to send otp");
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, otp, password, confirmPassword } =
      req.body;

    console.log("this is the otp", otp);
    if (
      !firstName ||
      !lastName ||
      !email ||
      !otp ||
      !password ||
      !confirmPassword
    ) {
      console.log("All fields are required");
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    // Match the password
    if (password !== confirmPassword) {
      console.log("Password Does not Match");
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    // Check if the user if already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(403).json({
        success: false,
        message: "User is already register",
      });
    }

    console.log("user is exists");

    // fetch the otp from schema
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("the recent otp is", recentOtp);

    const isValid = await bcrypt.compare(otp, recentOtp[0].otp);

    console.log("the recent otp is", isValid);

    // compare the otp
    if (!isValid) {
      return res.status(403).json({
        success: false,
        message: "Otp does not matched",
      });
    }

    //  hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: "User is registred successfully",
      user: user,
    });
  } catch (err) {
    console.log("User Failed to SignUp");
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("All the fields are required");
      return res.status(500).json({
        success: false,
        message: "all fields are required",
      });
    }

    // check if user is registerd
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    // check the password and genrate the jwt
    if (check) {
      const payload = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      user.token = token;
      user.password = undefined;

      // create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
  } catch (err) {
    console.log("User Failed to Login");
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { password, newPassword, confirmNewPassword } = req.body;
    
    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password change",
        passwordChange(
          updatedUserDetails.email,
          ` ${updatedUserDetails.firstName}, ${updatedUserDetails.lastName}`
        )
      );

      

    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
 console.log("the response is here")
    // Return success response
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
