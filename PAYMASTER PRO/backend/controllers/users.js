const { signupSchemaValidation, signinSchemaValidation, updateProfileValidation } = require("../config/zodValidation");
const User = require("../model/user");
const Account = require("../model/account");
const { generatePassword, validPassword } = require("../config/passwordUtils");
const { jwtDecode, jwtEncode } = require("../config/jwtUtils");

const signup = async (req, res) => {
    const {email, username, password} = req.body;
    const {success} = signupSchemaValidation.safeParse({email, username, password});
    if(!success) {
        return res.status(401).json({
            "msg": "Invalid Inputs"
        })
    }
    const {salt, hash} = generatePassword(password);
    try{
        const newUser = await User.create({
            email,
            username,
            firstName: "",
            lastName: "",
            address: "",
            mobNo: "",
            hash,
            salt
        });

        // await Account.create({
        //     userId: newUser._id,
        //     balance: (Math.floor(Math.random() * 10000) + 1)
        // });
    
        return res.status(200).json({
            "msg": "new user created",
            "token": jwtEncode(newUser._id)
        })
    }
    catch(err){
        return res.status(401).json({
            "msg": `username: ${username} is already taken`
        })   
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body;
    const {success} = signinSchemaValidation.safeParse({email, password});
    if(!success) {
        return res.status(401).json({
            "msg": "Invalid Inputs"
        })
    }
    try{
        const user = await User.findOne({email: email});
        const isValid = validPassword(password, user.hash, user.salt);
        if(!isValid){
            return res.status(401).json({
                "msg": "wrong password"
            })
        }
        if(!user){
            return res.status(401).json({
                "msg": "email is not registered"
            })
        }
        return res.status(200).json({
            "msg": "successfuly signed in",
            token: jwtEncode(user._id)
        })
    }
    catch(err){
        return res.status(401).json({
            "msg": "unexpected error",
        })
    }
}

const updateProfile = async (req, res) => {
    const {firstName, lastName, address, mobNo} = req.body;
    const {success} = updateProfileValidation.safeParse({firstName, lastName, address, mobNo});
    if(!success){
        return res.status(401).json({
            "msg": "Invalid Inputs"
        });
    }
    try{
        await User.updateOne({_id: req.userId}, {
            $set: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                mobNo: mobNo
            }
        });
        return res.status(200).json({
            "msg": "successfuly updated profile"
        });
    }
    catch(err){
        return res.status(401).json({
            "msg": "unexpected error",
        });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const {username, firstName, lastName, address, mobNo} = await User.findOne({_id: req.userId});
        res.status(200).json({
            userinfo: { username, firstName, lastName, address, mobNo }
        })
    } catch (error) {
        res.status(400).json({msg: "some error"})
    }    
}

const getUsers = async (req, res) => {
    const filter = req.query.filter || "";
    try{
        const users = await User.find({
            $or:[{
                    username: {
                        "$regex": filter
                    }  
                },
                {
                    firstName: {
                        "$regex": filter
                    }  
                },
                {
                    lastName: {
                        "$regex": filter
                    }  
                },
                {
                    mobNo: {
                        "$regex": filter
                    }
                }]
        });
        res.json({
            users: users.map((user) => ({
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }))
        })
    }
    catch(err){
        return res.status(401).json({msg: "failed to get users"})
    }
}

const alreadyThere = async (req, res) => {
    try{
        if(!req.body.token) return res.json({})
        const userObj = jwtDecode(req.body.token, process.env.SECRET_KEY);
        if(!userObj) {
            return res.status(200).json({
                msg: false
            })
        }
        const user = await User.findOne({_id: userObj.userId});
        if(!user){
            return res.status(200).json({
                msg: false
            })
        }
        return res.status(200).json({
            msg: true
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            msg: false
        })
    }
}

module.exports = {
    signup,
    signin,
    updateProfile,
    getUsers,
    getUserInfo,
    alreadyThere
}