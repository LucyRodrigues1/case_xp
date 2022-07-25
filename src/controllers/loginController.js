const express = require('express');
const loginService = require('../services/loginService');
const loginValMid = require('../middlewares/loginValidator');

const loginRouter = express.Router();

loginRouter.post('/', loginValMid, async (req, res) => {
  try {
    const token = await loginService.authenticate(req.body);
    res.status(200).json(token);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = loginRouter;