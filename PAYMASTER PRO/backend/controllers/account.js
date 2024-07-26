const Account = require("../model/account");
const TransctionsHistory = require("../model/history");
const { validPassword } = require("../config/passwordUtils");
const Bank = require("../model/bank");

const getBalance = async (req, res) =>{
    try{
        const a = await Account.findOne({userId: req.userId});
        
        res.status(200).json({
            balance: a?a.balance:null
        })
    }    
    catch(err){
        res.status(403).json({
            "msg": "unexpected error"
        })
    }
}

const transferMoney = async (req, res) =>{
    const { amount, to, upipin } = req.body;
    try{
        const bankData = await Bank.findOne({
            accountId: req.userId
        });
        const isValid = validPassword(toString(upipin) ,bankData.upiHash, bankData.upiSalt);
        if(!isValid) {
            return res.status(402).json({
                msg: "wrong UPI PIN"
            })
        }
        const sender = await Account.find({ userId: req.userId });
        if(sender[0].balance < amount){
            return res.status(200).json({
                msg: false
            })
        }
        const receiver = await Account.find({ userId: to });
        if(!receiver){
            return res.status(401).json({
                msg: "Account not found"
            })
        }
        const exists = await TransctionsHistory.find({ 
            accountId: req.userId,
            receiver: to 
        });
        await Account.updateOne({userId: req.userId}, {
            $inc: {
                balance: -amount
            }
        });
        
        await Account.updateOne({userId: to}, {
            $inc: {
                balance: amount
            }
        });

        if(!exists || exists.length === 0) {
            const date = new Date();
            const history = await TransctionsHistory.create({
                accountId: req.userId,
                receiver: to,
                amountHistory: [{transferedAmount: amount, Date: `${date.getDate()}/ ${date.getMonth()+1} /${date.getFullYear()}`, time: `${date.toLocaleTimeString()}`}]
            })
            return res.status(200).json({
                msg: "transfer successful/ history created"
            });
        }
        const date = new Date();
        await TransctionsHistory.updateOne({ 
            accountId: req.userId,
            receiver: to 
        }, 
            {
                $push: {
                    amountHistory: {transferedAmount: amount, Date: `${date.getDate()}/ ${date.getMonth()+1} /${date.getFullYear()}`, time: `${date.toLocaleTimeString()}`}
                }
            }
        );
        return res.status(200).json({
            msg: "transfer successful"
        });
        
    }catch(err){
        console.log(err)
        return res.status(401).json({
            msg: "unexpected error"
        });
    }
}

const showHistory = async (req, res) =>{
    try{
        const {receiverId} = req.body;
        const history = await TransctionsHistory.findOne({accountId: req.userId, receiver: receiverId});
        if(!history){
            return res.status(200).json({msg: "No History found"})
        }
        return res.status(200).json({
            history 
        })
    }catch(err){
        return res.status(400).json({
            msg: "unexpected error"
        })
    }
}

module.exports = {
    getBalance,
    transferMoney,
    showHistory
}