const { Stock } = require('../database/models');

const getStocks = async () => Stock.findAll();

const getStockById = async (id) => {
  const stock = await Stock.findByPk(id);
  if (!stock) {
    const errorMessage = { status: 404, message: 'Stock does not exist' };
    throw errorMessage;
  }

  console.log(stock);

  const newObj = {
    CodAtivo: stock.dataValues.id,
    code: stock.dataValues.code,
    companyName: stock.dataValues.companyName,
    QtdeAtivo: stock.dataValues.amount,
    Valor: stock.dataValues.price,
  };
  return newObj;
};

module.exports = {
  getStocks,
  getStockById,
};