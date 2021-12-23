import { Express, Request, Response } from 'express';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import clientRoutes from './client.routes';
import measurementRoutes from './measurement.routes';

const routes = (app: Express) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/sessions', sessionRoutes);
  app.use('/api/v1/clients', clientRoutes);
  app.use('/api/v1/measurements', measurementRoutes);
};

export default routes;
