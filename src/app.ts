import express, { Application } from 'express';
import path from 'path';
import router from './router/apiRouter';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

export default app;
