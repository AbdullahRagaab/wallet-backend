import jwt from 'jsonwebtoken';

const generateJWT = (payload, expiresIn = '12h') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export default generateJWT;

