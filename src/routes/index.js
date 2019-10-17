import express from 'express';

import { storesControllers , errorsControllers } from 'controllers';
import { asyncHandler } from 'middleware/asyncHandler';
import { validateQuery } from 'middleware/validate';
import { storesValidation } from 'validations';


const router = express.Router();
router.get('/closest?', validateQuery(storesValidation.getClosestStore),
  asyncHandler(storesControllers.getClosestStore));
router.get('/error', asyncHandler(errorsControllers.getError));

module.exports = router;
