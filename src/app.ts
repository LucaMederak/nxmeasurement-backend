import express, { Request, Response } from 'express';

import { port } from './config/config';
import responseTime from 'response-time';
import connect from './api/v1/utils/connect';
import logger from './api/v1/utils/logger';
import routes from './api/v1/routes/routes';
import deserializeUser from './api/v1/middleware/deserializeUser';
import {
  restResponseTimeHistogram,
  startMetricsServer,
} from './api/v1/utils/metrics';
import swaggerDocs from './api/v1/utils/swagger';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(deserializeUser);

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);

  startMetricsServer();

  swaggerDocs(app, port);
});
