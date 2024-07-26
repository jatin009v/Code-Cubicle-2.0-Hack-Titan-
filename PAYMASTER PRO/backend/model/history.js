const mongoose = require("mongoose");

const transactionHitorySchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    amountHistory: {
        type: Array,
        require: true
    }
});

const TransctionsHistory = mongoose.model("transctions", transactionHitorySchema);

module.exports = TransctionsHistory;