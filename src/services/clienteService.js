const { ClientsStock, Stock } = require('../database/models');

const getClienteById = async (id) => {
  const clients = await ClientsStock.findAll({ 
    attributes: [
      ['clientId', 'CodCliente'],
      ['stockId', 'CodAtivo'],
      ['amount', 'QtdeAtivo'],
    ],
    where: { clientId: id },
  });
  if (!clients) {
    const errorMessage = { status: 404, message: 'Client does not exist' };
    throw errorMessage;
  }

  const stocks = await Stock.findAll();

  const result = clients.map((client) => {
    const valor = stocks.find((stock) => stock.dataValues.id === client.dataValues.CodAtivo);
    const obj = {
      ...client.dataValues,
      Valor: valor.price
    }
    return obj;
  });

  return result;
};

module.exports = {
  getClienteById
}