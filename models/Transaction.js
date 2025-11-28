import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
    amount: { type: Number, required: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    reference: { type: String },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

