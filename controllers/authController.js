import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import generateJWT from '../utils/generateJWT.js';
import { validateEmail, validatePassword } from '../utils/validateInput.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid credentials format' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = await User.create({ name, email, password, phone });
    await Wallet.create({ userId: user._id });
    const token = generateJWT({ id: user._id, role: user.role });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account blocked. Contact support.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateJWT({ id: user._id, role: user.role });
    res.json({
      token,
      requires2FA: user.twoFactorEnabled,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verify2fa = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA not enabled' });
    }
    if (code !== '123456') {
      return res.status(400).json({ message: 'Invalid 2FA code' });
    }
    const token = generateJWT({ id: user._id, role: user.role });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

