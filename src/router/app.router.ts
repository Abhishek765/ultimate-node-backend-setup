import { Router } from 'express';

import { health, self } from '../controllers/app.controller';
import rateLimiterMiddleware from '../middlewares/rateLimiter.middleware';

const router = Router();

router.route('/self').get(rateLimiterMiddleware, self);
router.route('/health').get(health);

// // Create a route for authenticated users
// router.route('/authenticated').get((_req, _res) => {
//   // fetch user details from req.body
// });

export default router;
