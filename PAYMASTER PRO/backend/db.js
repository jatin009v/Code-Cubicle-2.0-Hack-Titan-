const mongoose  = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.SECRET_DB_STRING);
        console.log("DB Connected");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;