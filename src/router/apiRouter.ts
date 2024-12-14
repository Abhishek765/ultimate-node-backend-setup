import { Router } from 'express';

import { health, self } from '../controllers/apiController';

const router = Router();

router.route('/self').get(self);
router.route('/health').get(health);

// // Create a route for authenticated users
// router.route('/authenticated').get((_req, _res) => {
//   // fetch user details from req.body
// });

export default router;
