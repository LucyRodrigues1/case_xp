const express = require('express');
const stockService = require('../services/stockService');

const stockRouter = express.Router();


stockRouter.get('/', async (req, res) => {
  try {
    const stocks = await stockService.getStocks();
    return res.status(200).json(stocks);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

stockRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const stocks = await stockService.getStockById(id);
    return res.status(200).json(stocks);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = stockRouter;