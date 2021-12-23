import express from 'express';

//controllers
import {
  createMeasurementController,
  updateMeasurementController,
  deleteMeasurementController,
  getMeasurementController,
  getMeasurementsController,
} from '../controllers/measurement.controller';

//schema
import {
  createMeasurementSchema,
  deleteMeasurementSchema,
  getMeasurementSchema,
  updateMeasurementSchema,
} from '../schema/measurement.schema';

//middleware
import requireUser from '../middleware/requireUser';
import validateSchema from '../middleware/validateSchema';

const router = express.Router();

router.get(
  '/:measurementId',
  [requireUser, validateSchema(getMeasurementSchema)],
  getMeasurementController
);

router.get('/', requireUser, getMeasurementsController);

router.post(
  '/',
  [requireUser, validateSchema(createMeasurementSchema)],
  createMeasurementController
);

router.put(
  '/:measurementId',
  [requireUser, validateSchema(updateMeasurementSchema)],
  updateMeasurementController
);

router.delete(
  '/:measurementId',
  [requireUser, validateSchema(deleteMeasurementSchema)],
  deleteMeasurementController
);

export default router;
