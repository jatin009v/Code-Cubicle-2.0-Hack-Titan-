const Bank = require("../model/bank");
const Account = require("../model/account");

const  { generatePassword } = require("../config/passwordUtils");

const getBank = async (req, res) => {
    try{
        const bank = await Bank.findOne({accountId: req.userId});
        if(!bank){
            return res.status(200).json({msg: false});
        }
        return res.status(200).json({msg: true});
    }catch(err){
        return res.status(400).json({msg: "unexpected error"})
    }
}

const setBank = async (req, res) => {
    try {
        const {bankName, upipin, mobNumber} = req.body;
        const {salt, hash} = generatePassword(toString(upipin));
        const newBank = await Bank.create({
            accountId: req.userId,
            bankName,
            registeredMobNo: mobNumber,
            upiSalt: salt,
            upiHash: hash
        });
        await Account.create({
            userId: req.userId,
            balance: (Math.floor(Math.random() * 10000) + 1)
        });
        
        res.status(200).json({
            msg: "Bank Linked"
        });

    } catch (error) {
        res.status(402).json({
            msg: "Failed to link Bank"
        });
    }
}

module.exports = {setBank, getBank};