import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const ivLength = 16;

const getKey = () => {
  if (!process.env.AES_SECRET) {
    throw new Error('AES_SECRET not configured');
  }
  return crypto.createHash('sha256').update(process.env.AES_SECRET).digest();
};

export const encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (hash) => {
  if (!hash) return hash;
  const [ivHex, encryptedHex] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, getKey(), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
};

