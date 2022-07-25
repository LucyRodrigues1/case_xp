const express = require('express');
const contaService = require('../services/contaService');

const contaRouter = express.Router();

contaRouter.put('/deposito', async (req, res) => {
  try {
    const { CodCliente, Valor } = req.body;
    const result = await contaService.deposit(CodCliente, Valor);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

contaRouter.put('/saque', async (req, res) => {
  try {
    const { CodCliente, Valor } = req.body;
    const result = await contaService.withdraw(CodCliente, Valor);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

contaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await contaService.getContaById(id);
    return res.status(200).json(cliente);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = contaRouter;
