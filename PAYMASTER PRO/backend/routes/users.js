const express = require("express");
const { signup, signin, updateProfile, getUsers, getUserInfo, alreadyThere } = require("../controllers/users")
const { userAuth }  = require("../middleware/authUser")

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/update", userAuth, updateProfile);
userRouter.get("/getinfo", userAuth, getUserInfo);
userRouter.get("/bulk", userAuth, getUsers);
userRouter.post("/me", alreadyThere);

module.exports = userRouter;