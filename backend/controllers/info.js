const Data = require("../models/Data");
const User = require("../models/User");
const { encrypt } = require("../utils/encryption");
const { decrypt } = require("../utils/encryption");

 exports.updatesites = async (req, res) => {



  try{
    const { siteName, userName, password, siteId } = req.body;
    const userId = req.user.id;

    console.log("objectasssssss",siteName,userName,password,siteId)

    if (!siteName || !userName || !password || !siteId ) {
      return res.status(404).json({
        success: false,
        message: "Data Not found",
      });
    }
    const encryptedPassword = encrypt(password);

    const updatedData = await Data.findByIdAndUpdate(
      siteId,
      { siteName, userName, password: encryptedPassword },
      { new: true }
    );

    if (!updatedData) {
      return res.status(500).json({
        success: false,
        message: "Failed to update the data",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedData,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Error in update the data",
    });
  }
};

exports.site = async (req, res) => {
  try {
    const { siteName, userName, password, id } = req.body;

    if (!siteName || !userName || !password) {
      return res.status(404).json({
        success: false,
        message: "Data Not founds",
      });
    }

    const userId = req?.user?.id;

    console.log(userId, "datas not found");

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    // const hashPassword = await bcrypt.hash(password,10);
    const encryptedPassword = encrypt(password);

    const newData = await Data.create({
      siteName,
      userName,
      password: encryptedPassword,
      user: userId,
    });

    console.log("this is userid", newData);

    return res.status(200).json({
      success: true,
      message: "New Data Creation Successfully",
      data: newData,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Unable to registered Data",
    });
  }
};

exports.getsites = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await Data.find({ user: userId });

    if (userDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data found For this user",
      });
    }

    const decryptedData = userDetails.map((item) => ({
      ...item._doc,
      password: decrypt(item.password),
    }));

    res.status(200).json({
      success: true,
      data: decryptedData,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to get the data",
    });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const { siteId } = req.body;

    if (siteId === null) {
      return res.status(404).json({
        success: false,
        message: "No Data found For this user",
      });
    }

    console.log("this is siteID", siteId);
    const response = await Data.findByIdAndDelete(siteId);

    // if(response === null) {
    //   return res.status(404).json({
    //     success:false,
    //     message:"response not found"
    //   })
    // }
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    console.log("this is from  deletesite ", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to Delete the sitess",
    });
  }
};
