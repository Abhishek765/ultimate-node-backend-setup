import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import path from 'path';

import config from './config';
import globalErrorHandlerMiddleware from './middlewares/globalErrorHandler.middleware';
import routeNotFoundHandlerMiddleware from './middlewares/routeNotFoundHandler.middleware';
import router from './router/app.router';

const app: Application = express();

// middlewares
app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: [config.CLIENT_URL], // add more urls as needed
    credentials: true
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

// 404 error handler
app.use(routeNotFoundHandlerMiddleware);

// globalErrorHandler
app.use(globalErrorHandlerMiddleware);

export default app;
