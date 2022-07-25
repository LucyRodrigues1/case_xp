const express = require('express');
const userService = require('../services/userService');
const userValidatorMid = require('../middlewares/userValidator');
const authTokenValidator = require('../middlewares/authTokenValidator');

const userRouter = express.Router();

userRouter.post('/cadastrar', userValidatorMid, async (req, res) => {
  try {
    const token = await userService.createUser(req.body);
    res.status(201).json({ token });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

userRouter.put('/depositar', authTokenValidator, async (req, res) => {
  try {
    const { value } = req.body;
    const { email } = res.locals.user;
    const result = await userService.deposit(email, value);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

userRouter.put('/sacar', authTokenValidator, async (req, res) => {
  try {
    const { value } = req.body;
    const { email } = res.locals.user;
    const result = await userService.withdraw(email, value);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = userRouter;