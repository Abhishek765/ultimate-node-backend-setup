import express, { Application } from 'express';
import helmet from 'helmet';
import path from 'path';

import globalErrorHandler from './middlewares/globalErrorHandler';
import routeNotFoundHandler from './middlewares/routeNotFoundHandler';
import router from './router/apiRouter';

const app: Application = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

// 404 error handler
app.use(routeNotFoundHandler);

// globalErrorHandler
app.use(globalErrorHandler);

export default app;
