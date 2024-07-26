const express = require("express");
const { userAuth } = require("../middleware/authUser");
const {setBank, getBank} = require("../controllers/bank");

const bankRouter = express.Router();

bankRouter.post("/set", userAuth, setBank);
bankRouter.get("/get", userAuth, getBank);

module.exports = bankRouter;