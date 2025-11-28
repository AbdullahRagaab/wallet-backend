import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const listTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate('fromUser toUser', 'email name');
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;
    const user = await User.findByIdAndUpdate(id, { isBlocked }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

