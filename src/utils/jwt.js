const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateJWTToken = ({ email }) => jwt.sign({ email }, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  const errorMessage = { status: 401, message: 'Expired or invalid token' };
  if (!token) {
    throw (errorMessage);
  }

  try {
    const validate = await jwt.verify(token, JWT_SECRET);
    return validate;
  } catch (err) {
    throw (errorMessage);
  }
};

module.exports = { generateJWTToken, authenticateToken };