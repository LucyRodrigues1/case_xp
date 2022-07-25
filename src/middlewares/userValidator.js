const Joi = require('joi');

const caracteresDTO = Joi.object({
  userName: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
});

const errorCheck = (error) => {
  const isError = error ? error.details[0].type : false;
  return isError === 'any.required' 
  || isError === 'string.min'
  || isError === 'number.greater'
  || isError === 'string.email';
};

const validationMiddleware = (req, res, next) => {
  const { error } = caracteresDTO.validate(req.body, { abortEarly: true });
  const errorResult = errorCheck(error);
  if (errorResult) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validationMiddleware;