const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }, 
    bankName: {
        type: String,
        require: true
    },
    registeredMobNo: {
        type: String,
        require: true
    },
    upiSalt: {
        type: String,
        require: true
    },
    upiHash: {
        type: String,
        require: true
    }
});

const Bank = mongoose.model("banks", bankSchema);

module.exports = Bank