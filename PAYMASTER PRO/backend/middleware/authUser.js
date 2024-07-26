const { jwtDecode } = require("../config/jwtUtils");

function userAuth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(400).json({
            "msg": "token not found"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const userObj = jwtDecode(token, process.env.SECRET_KEY);
        req.userId = userObj.userId;
        next();
    }
    catch(err){
        res.status(402).json({
            "msg": "unauthorized"
        })
    }

}

module.exports = {
    userAuth
};