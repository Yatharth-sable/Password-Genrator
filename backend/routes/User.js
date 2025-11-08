const express= require("express")
const router = express.Router();
const {auth} = require("../middleware/auth")
const {updatesites} = require("../controllers/info")

const {
    login,
    signUp,
    sendOTP,
    changePassword,
} = require("../controllers/Auth")

const{
    site,
    getsites,
    deleteSite
} = require("../controllers/info")

const {
    resetPassword,
    resetPasswordToken
} = require("../controllers/ResetPassword")

router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP)
router.post("/changePassword",auth,changePassword)
router.put("/updatesites",auth,updatesites)

router.post("/reset-password", resetPassword)
router.post("/reset-password-token", resetPasswordToken)

router.put("/insertData",auth,site)
router.get("/getData",auth,getsites)
router.delete("/deleteData",auth,deleteSite)


module.exports = router
