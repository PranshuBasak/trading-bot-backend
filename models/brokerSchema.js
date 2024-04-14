const Joi = require('joi');

const eventQueryParamsSchema = Joi.object({
  since: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  until: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  since_id: Joi.string().pattern(/^\d+$/),
  until_id: Joi.string().pattern(/^\d+$/),
  since_ulid: Joi.string(),
  until_ulid: Joi.string(),
  id: Joi.string()
}).oxor('since', 'since_id', 'since_ulid')
  .with('until', 'since')
  .with('until_id', 'since_id')
  .with('until_ulid', 'since_ulid');


module.exports = eventQueryParamsSchema;