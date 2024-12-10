import { Router } from 'express';
import { self } from '../controllers/apiController';

const router = Router();

router.route('/self').get(self);

// // Create a route for authenticated users
// router.route('/authenticated').get((_req, _res) => {
//   // fetch user details from req.body
// });

export default router;
