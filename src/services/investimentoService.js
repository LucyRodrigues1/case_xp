const { Client, Stock, ClientsStock } = require('../database/models');

const comprar = async ({ codCliente, codAtivo, qtdeAtivo }, transaction) => {
  const client = await Client.findOne({ where: { id: codCliente } });
  if (!client) {
    const errorMessage = { status: 409, message: 'Client does not exist' };
    throw errorMessage; 
  }
  const stock = await Stock.findOne({ where: { id: codAtivo } });
  if (!stock) {
    const errorMessage = { status: 409, message: 'Stock does not exist' };
    throw errorMessage; 
  }
  if (stock.dataValues.amount < qtdeAtivo) {
    const errorMessage = { status: 409, message: 'A corretora não possui a quantidade de ativos suficentes.' };
    throw errorMessage;
  }

  const valorGasto = qtdeAtivo * parseInt(stock.dataValues.price);
  const novoSaldoDoCliente = parseFloat(client.dataValues.saldo) - valorGasto;
  const novaQtdDeAtivos = parseInt(stock.dataValues.amount) - qtdeAtivo;

  await Client.update({ saldo: novoSaldoDoCliente }, {
    where: { id: codCliente } }, { transaction });

  await Stock.update({ amount: novaQtdDeAtivos }, {
    where: { id: codAtivo } }, { transaction });

  const clientStock = await ClientsStock.findOne({ where: { stockId: codAtivo, clientId: codCliente } });

  if (clientStock) {
    const novaQtsDeAtivosDoCliente = parseInt(clientStock.dataValues.amount) + qtdeAtivo
    await ClientsStock.update({
      amount: novaQtsDeAtivosDoCliente,
      totalRate: novaQtsDeAtivosDoCliente * parseFloat(stock.dataValues.price)
    }, {
      where: { stockId: codAtivo, clientId: codCliente } }, { transaction })
  } else {
    await ClientsStock.create({
      stockId: codAtivo,
      clientId: codCliente,
      amount: qtdeAtivo,
      totalRate: qtdeAtivo * parseFloat(stock.dataValues.price)
    }, { transaction })
  }
  await transaction.commit();
  const newClientStock = await ClientsStock.findOne({ where: { stockId: codAtivo, clientId: codCliente } });

  return newClientStock;

};

const vender = async ({ codCliente, codAtivo, qtdeAtivo }, transaction) => {
  const client = await Client.findOne({ where: { id: codCliente } });
  if (!client) {
    const errorMessage = { status: 409, message: 'Client does not exist' };
    throw errorMessage; 
  }
  const stock = await Stock.findOne({ where: { id: codAtivo } });
  if (!stock) {
    const errorMessage = { status: 409, message: 'Stock does not exist' };
    throw errorMessage; 
  }
  if (client.dataValues.amount < qtdeAtivo) {
    const errorMessage = { status: 409, message: 'O cliente não possui a quantidade de ativos suficentes.' };
    throw errorMessage;
  }

  const valorRecebido = qtdeAtivo * parseInt(stock.dataValues.price);
  const novoSaldoDoCliente = parseFloat(client.dataValues.saldo) + valorRecebido;
  const novaQtdDeAtivos = parseInt(client.dataValues.amount) - qtdeAtivo;

  await Client.update({ saldo: novoSaldoDoCliente, amount: novaQtdDeAtivos }, {
    where: { id: codCliente } }, { transaction });

  const clientStock = await ClientsStock.findOne({ where: { stockId: codAtivo, clientId: codCliente } });

  if (clientStock) {
    const novaQtsDeAtivosDoCliente = parseInt(clientStock.dataValues.amount) - qtdeAtivo;
    await ClientsStock.update({
      amount: novaQtsDeAtivosDoCliente,
      totalRate: novaQtsDeAtivosDoCliente * parseFloat(stock.dataValues.price)
    }, {
      where: { stockId: codAtivo, clientId: codCliente } }, { transaction })
  } else {
    const errorMessage = { status: 409, message: 'O cliente não possui a quantidade de ativos suficentes.' };
    throw errorMessage;
  }
  await transaction.commit();
  const newClientStock = await ClientsStock.findOne({ where: { stockId: codAtivo, clientId: codCliente } });

  return newClientStock;

};



module.exports = {
  comprar,
  vender,
}