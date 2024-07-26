const jwt = require("jsonwebtoken");

function jwtEncode(userId){
    return jwt.sign({userId}, process.env.SECRET_KEY);
}

function jwtDecode(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
    jwtEncode,
    jwtDecode
}