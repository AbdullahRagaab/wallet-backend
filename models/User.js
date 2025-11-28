import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../utils/encryption.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: {
      type: String,
      get: decrypt,
      set: encrypt,
    },
    walletBalance: { type: Number, default: 0 },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    twoFactorEnabled: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } },
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

