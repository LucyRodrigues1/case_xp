const { authenticateToken } = require('../utils/jwt');

const authTokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  const errorMessage = { status: 401, message: 'Token not found' };
  try {
    if (!token) {
      throw errorMessage;
    }
    const validateToken = await authenticateToken(token);
    if (!validateToken) {
      throw errorMessage;
    }
    res.locals.user = validateToken;
    next();
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = authTokenValidator;