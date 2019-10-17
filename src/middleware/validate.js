import { createValidator } from 'express-joi-validation';

export const validateQuery = (body) => createValidator({}).query(body);
