import express, { Application } from 'express';
import path from 'path';
import router from './router/apiRouter';
import globalErrorHandler from './middlewares/globalErrorHandler';
import routeNotFoundHandler from './middlewares/routeNotFoundHandler';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

// 404 error handler
app.use(routeNotFoundHandler);

// globalErrorHandler
app.use(globalErrorHandler);

export default app;
