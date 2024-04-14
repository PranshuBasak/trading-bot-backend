const Joi = require('joi');

const orderSchema = Joi.object({
  symbol: Joi.string().uppercase().required(),
  qty: Joi.number().integer().min(1).max(100).optional(),
  notional: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(),
  side: Joi.string().valid('buy', 'sell').required(),
  type: Joi.string().valid('market', 'limit', 'stop', 'stop_limit', 'trailing_stop').required(),
  time_in_force: Joi.string().valid('day', 'gtc', 'opg', 'cls', 'ioc', 'fok').required(),
  limit_price: Joi.when('type', { is: Joi.string().valid('limit', 'stop_limit'), then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).required(), otherwise: Joi.forbidden() }),
  stop_price: Joi.when('type', { is: Joi.string().valid('stop', 'stop_limit'), then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).required(), otherwise: Joi.forbidden() }),
  trail_price: Joi.when('type', { is: 'trailing_stop', then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(), otherwise: Joi.forbidden() }),
  trail_percent: Joi.when('type', { is: 'trailing_stop', then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(), otherwise: Joi.forbidden() }),
  extended_hours: Joi.boolean().optional(),
  client_order_id: Joi.string().optional(),
  order_class: Joi.string().valid('simple', 'oco', 'oto', 'bracket', '').optional(),
});

const reorderSchema = Joi.object({
  symbol: Joi.string().uppercase().optional(),
  qty: Joi.number().integer().min(1).max(100).optional(),
  notional: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(),
  side: Joi.string().valid('buy', 'sell').required(),
  type: Joi.string().valid('market', 'limit', 'stop', 'stop_limit', 'trailing_stop').optional(),
  time_in_force: Joi.string().valid('day', 'gtc', 'opg', 'cls', 'ioc', 'fok').required(),
  limit_price: Joi.when('type', { is: Joi.string().valid('limit', 'stop_limit'), then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(), otherwise: Joi.optional() }),
  stop_price: Joi.when('type', { is: Joi.string().valid('stop', 'stop_limit'), then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(), otherwise: Joi.forbidden() }),
  trail: Joi.when('type', { is: 'trailing_stop', then: Joi.string().pattern(new RegExp('^[0-9]*\\.?[0-9]+$')).optional(), otherwise: Joi.optional() }),
  extended_hours: Joi.boolean().optional(),
  client_order_id: Joi.string().optional(),
  order_class: Joi.string().valid('simple', 'oco', 'oto', 'bracket', '').optional(),
});


module.exports = {
  orderSchema,
  reorderSchema
}

/*
symbol, side, type, and time_in_force are required fields.
qty and notional are optional and should match a numeric pattern (including fractional numbers).
limit_price is required if type is limit or stop_limit. It's forbidden in other cases.
stop_price is required if type is stop or stop_limit. It's forbidden in other cases.
trail_price and trail_percent are required if type is trailing_stop. They are forbidden in other cases.
extended_hours is optional and a boolean and only works with day limit order.
client_order_id and order_class are optional strings.

 */