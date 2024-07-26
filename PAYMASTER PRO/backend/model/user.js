const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        lowercase: true,
        require: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        require: true,
    },
    mobNo: {
        type: String,
        require: true
    },
    address: {
        type: String,
        lowercase: true,
        require: true,
    },
    hash: {
        type: String,
        require: true,
        unique: true,
    },
    salt: {
        type: String,
        require: true,
        unique: true
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User