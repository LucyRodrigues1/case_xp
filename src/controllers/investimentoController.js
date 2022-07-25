const express = require('express');
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const sequelize = new Sequelize(config.development);
const investimentoService = require('../services/investimentoService');

const investimentoRouter = express.Router();

investimentoRouter.post('/comprar', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const investimento = await investimentoService.comprar(req.body, transaction);
    res.status(201).json({ investimento });
  } catch (err) {
    await transaction.rollback();
    res.status(err.status).json({ message: err.message });
  }
});

investimentoRouter.post('/vender', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const investimento = await investimentoService.vender(req.body, transaction);
    res.status(201).json({ investimento });
  } catch (err) {
    await transaction.rollback();
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = investimentoRouter;
