const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/jwt');

const createUser = async ({
  userName,
  email,
  password,
}) => {
  const emailCheck = await User.findOne({ where: { email } });
  if (emailCheck) {
    const errorMessage = { status: 409, message: 'Email already registered' };
    throw errorMessage; 
  }

  const userNameCheck = await User.findOne({ where: { userName } });
  if (userNameCheck) {
    const errorMessage = { status: 409, message: 'User name already registered' };
    throw errorMessage; 
  }

  const user = await User.create({
    userName,
    email,
    password,
  });
  console.log(user);
  return generateJWTToken({ email });
};

const deposit = async (email, value) => {
  if (value === undefined || value < 0) {
    const errorMessage = { status: 409, message: 'Valor deve ser maior que R$0,00' };
    throw errorMessage; 
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const errorMessage = { status: 409, message: 'User does not exist' };
    throw errorMessage; 
  }
  const novoSaldo = parseFloat(user.saldo) + value;
  const userUpdated = await User.update({ saldo: novoSaldo }, {
    where: { email }
  });
  console.log(userUpdated);
  return `O novo saldo de ${user.userName} é de ${novoSaldo}`;
};

const withdraw = async (email, value) => {
  if (value === undefined || value < 0) {
    const errorMessage = { status: 409, message: 'Valor deve ser maior que R$0,00' };
    throw errorMessage; 
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const errorMessage = { status: 409, message: 'User does not exist' };
    throw errorMessage; 
  }
  if (value > parseFloat(user.saldo)) {
    const errorMessage = { status: 409, message: 'Você não tem saldo o suficiente para sacar esse valor' };
    throw errorMessage;
  }
  const novoSaldo = parseFloat(user.saldo) - value;
  const userUpdated = await User.update({ saldo: novoSaldo }, {
    where: { email }
  });
  console.log(userUpdated);
  return `O novo saldo de ${user.userName} é de ${novoSaldo}`;
};

module.exports = {
  createUser,
  deposit,
  withdraw,
};