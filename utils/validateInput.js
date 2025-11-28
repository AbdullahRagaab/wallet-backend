import validator from 'validator';

export const validateEmail = (email) => validator.isEmail(email || '');

export const validatePassword = (password) =>
  validator.isLength(password || '', { min: 8 }) &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[0-9]/.test(password);

export const validateAmount = (amount) =>
  typeof amount === 'number' && !Number.isNaN(amount) && amount > 0;

