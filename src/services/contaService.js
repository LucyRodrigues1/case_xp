const { Client } = require('../database/models');

const deposit = async (CodCliente, value) => {
  if (value === undefined || value < 0) {
    const errorMessage = { status: 409, message: 'Valor deve ser maior que R$0,00' };
    throw errorMessage; 
  }
  const client = await Client.findOne({ where: { id: CodCliente } });
  if (!client) {
    const errorMessage = { status: 409, message: 'User does not exist' };
    throw errorMessage; 
  }
  const novoSaldo = parseFloat(client.saldo) + value;
  const clientUpdated = await Client.update({ saldo: novoSaldo }, {
    where: { id: CodCliente }
  });
  console.log(clientUpdated);
  return `O novo saldo da pessoa cliente ${client.clientName} é de ${novoSaldo}`;
};

const withdraw = async (CodCliente, value) => {
  if (value === undefined || value < 0) {
    const errorMessage = { status: 409, message: 'Valor deve ser maior que R$0,00' };
    throw errorMessage; 
  }
  const client = await Client.findOne({ where: { id: CodCliente } });
  if (!client) {
    const errorMessage = { status: 409, message: 'User does not exist' };
    throw errorMessage; 
  }
  if (value > parseFloat(client.saldo)) {
    const errorMessage = { status: 409, message: 'Você não tem saldo o suficiente para sacar esse valor' };
    throw errorMessage;
  }
  const novoSaldo = parseFloat(client.saldo) - value;
  const clientUpdated = await Client.update({ saldo: novoSaldo }, {
    where: { id: CodCliente }
  });
  console.log(clientUpdated);
  return `O novo saldo da pessoa cliente ${client.clientName} é de ${novoSaldo}`;
};

const getContaById = async (id) => {
  const client = await Client.findByPk(id, { 
    attributes: [
      ['id', 'CodCliente'],
      ['saldo', 'Saldo'],
    ],
  });
  if (!client) {
    const errorMessage = { status: 404, message: 'Client does not exist' };
    throw errorMessage;
  }
  return client;
};

module.exports = {
  deposit,
  withdraw,
  getContaById
};