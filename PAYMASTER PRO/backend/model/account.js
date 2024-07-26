const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    balance: {
        type: Number,
        require: true
    }
});

const Account = mongoose.model("accounts", accountSchema);

module.exports = Account;