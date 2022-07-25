const express = require('express');
const clienteService = require('../services/clienteService');

const clienteRouter = express.Router();

clienteRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.getClienteById(id);
    return res.status(200).json(cliente);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});


module.exports = clienteRouter;