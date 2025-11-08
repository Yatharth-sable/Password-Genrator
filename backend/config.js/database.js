const mongoose =require("mongoose")
require ("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => console.log("Connection With the Database Successfully"))
    .catch((err)=> {
        console.log("Connection With the Database id Failed")
        console.log(err)
        process.exit(1)
    })
}
