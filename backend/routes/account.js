const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId: userId });
  res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const userId = req.userId;
  const { to, amount } = req.body;
  const account = await Account.findOne({ userId: userId });
  if (account.balance < amount) {
    session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }
  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    session.abortTransaction();
    return res.status(400).json({ message: "Invalid recipient" });
  }
  account.balance -= amount;
  toAccount.balance += amount;
  await account.save();
  await toAccount.save();
  session.commitTransaction();
  res.json({ message: "Transfer successful" });
});

module.exports = router;
