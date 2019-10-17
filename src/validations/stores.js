import joi from '@hapi/joi';

export const getClosestStore = joi.object({
  zip: joi.number(),
  units: joi.string().valid('mi', 'km'),
  address: joi.string(),
}).or('zip', 'address').required();
