const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/jwt');

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    const errorMessage = { status: 400, message: 'Invalid fields' };
    throw errorMessage;
  }

  const token = generateJWTToken({ email });

  return { token };
};

module.exports = { authenticate };