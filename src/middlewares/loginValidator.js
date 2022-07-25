const Joi = require('joi');

const caracteresDTO = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const errorCheck = (error) => {
  const isError = error ? error.details[0].type : false;
  return isError === 'any.required' 
  || isError === 'string.min'
  || isError === 'string.email'
  || isError === 'string.empty';
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