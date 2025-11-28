import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { validateAmount } from '../utils/validateInput.js';
import { fraudCheck } from '../utils/fraudCheck.js';

const mockPaymentProcessor = async (amount) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { status: 'approved', reference: `PAY-${Date.now()}` };
};

export const getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    res.json(wallet);
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const deposit = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!validateAmount(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    if (!fraudCheck(req.user, amount)) {
      return res.status(403).json({ message: 'Deposit flagged by fraud system' });
    }
    const payment = await mockPaymentProcessor(amount);
    const wallet = await Wallet.findOne({ userId: req.user._id });
    wallet.balance += amount;
    wallet.history.push({
      type: 'deposit',
      amount,
      status: payment.status,
      metadata: { reference: payment.reference },
    });
    await wallet.save();

    const transaction = await Transaction.create({
      type: 'deposit',
      amount,
      toUser: req.user._id,
      status: 'completed',
      reference: payment.reference,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { walletBalance: amount },
      $push: { transactions: transaction._id },
    });
    res.json({ wallet, transaction });
  } catch (error) {
    next(error);
  }
};

export const withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!validateAmount(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    wallet.balance -= amount;
    wallet.history.push({ type: 'withdraw', amount, status: 'completed' });
    await wallet.save();

    const transaction = await Transaction.create({
      type: 'withdraw',
      amount,
      fromUser: req.user._id,
      status: 'completed',
    });
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { walletBalance: -amount },
      $push: { transactions: transaction._id },
    });
    res.json({ wallet, transaction });
  } catch (error) {
    next(error);
  }
};

export const transfer = async (req, res, next) => {
  try {
    const { amount, recipientEmail } = req.body;
    if (!validateAmount(amount) || !recipientEmail) {
      return res.status(400).json({ message: 'Invalid transfer data' });
    }
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    if (recipient._id.equals(req.user._id)) {
      return res.status(400).json({ message: 'Cannot transfer to self' });
    }
    const senderWallet = await Wallet.findOne({ userId: req.user._id });
    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    const recipientWallet = await Wallet.findOne({ userId: recipient._id });

    senderWallet.balance -= amount;
    senderWallet.history.push({
      type: 'transfer',
      amount,
      counterpart: recipient.email,
      status: 'completed',
    });
    await senderWallet.save();

    recipientWallet.balance += amount;
    recipientWallet.history.push({
      type: 'transfer',
      amount,
      counterpart: req.user.email,
      status: 'completed',
    });
    await recipientWallet.save();

    const transaction = await Transaction.create({
      type: 'transfer',
      amount,
      fromUser: req.user._id,
      toUser: recipient._id,
      status: 'completed',
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { walletBalance: -amount },
      $push: { transactions: transaction._id },
    });
    await User.findByIdAndUpdate(recipient._id, {
      $inc: { walletBalance: amount },
      $push: { transactions: transaction._id },
    });

    res.json({ transaction });
  } catch (error) {
    next(error);
  }
};

