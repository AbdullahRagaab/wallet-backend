import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
    amount: { type: Number, required: true },
    counterpart: { type: String },
    status: { type: String, default: 'completed' },
    date: { type: Date, default: Date.now },
    metadata: { type: Map, of: String },
  },
  { _id: false },
);

const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    history: [historySchema],
  },
  { timestamps: true },
);

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;

