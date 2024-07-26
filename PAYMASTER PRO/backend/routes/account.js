const express = require("express");
const { getBalance, transferMoney, showHistory } = require("../controllers/account");
const { userAuth } = require("../middleware/authUser");

const accountRouter = express.Router();

accountRouter.get("/balance", userAuth, getBalance);
accountRouter.post("/transfer", userAuth, transferMoney);
accountRouter.post("/history", userAuth, showHistory)

module.exports = accountRouter;