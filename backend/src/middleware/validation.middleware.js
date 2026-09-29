import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    next();
  };
};

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    fullName: Joi.string().max(255).optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  trade: Joi.object({
    symbol: Joi.string().required(),
    side: Joi.string().valid('BUY', 'SELL').required(),
    type: Joi.string().valid('MARKET', 'LIMIT', 'STOP_LOSS', 'TAKE_PROFIT').required(),
    price: Joi.number().positive().when('type', {
      is: 'MARKET',
      then: Joi.optional(),
      otherwise: Joi.required()
    }),
    quantity: Joi.number().positive().required(),
    stopPrice: Joi.number().positive().optional()
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required()
  }),

  deposit: Joi.object({
    amount: Joi.number().positive().required(),
    currency: Joi.string().default('USD'),
    depositMethod: Joi.string().optional()
  }),

  withdraw: Joi.object({
    amount: Joi.number().positive().required(),
    address: Joi.string().required(),
    currency: Joi.string().default('USD')
  })
};

export default { validate, schemas };