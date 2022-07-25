const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const stockController = require('./controllers/stockController');
const investimentoController = require('./controllers/investimentoController');
const clienteController = require('./controllers/clienteController');
const contaController = require('./controllers/contaController');
const authTokenValidator = require('./middlewares/authTokenValidator');
const routers = express.Router();

routers.use('/usuario', userController);
routers.use('/login', loginController);
routers.use('/ativos', authTokenValidator, stockController);
routers.use('/investimentos', authTokenValidator, investimentoController);
routers.use('/clientes', authTokenValidator, clienteController);
routers.use('/conta', authTokenValidator, contaController);

module.exports = routers;