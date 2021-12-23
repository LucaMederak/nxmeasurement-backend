import express from 'express';

//controllers
import {
  createUserController,
  getUserController,
} from '@controllers/user.controller';

//schema
import { createUserSchema } from '@schema/user.schema';

//middleware
import validateSchema from '@middleware/validateSchema';
import requireUser from '@middleware/requireUser';

const router = express.Router();

router.post('/', validateSchema(createUserSchema), createUserController);
router.get('/', requireUser, getUserController);

export default router;
