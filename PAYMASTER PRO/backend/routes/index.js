const express = require("express");
const userRouter = require("./users");
const accountRouter = require("./account");
const bankRouter = require("./banks");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/bank", bankRouter);

module.exports = router