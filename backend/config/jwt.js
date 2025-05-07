import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const verifyToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a valid string');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };