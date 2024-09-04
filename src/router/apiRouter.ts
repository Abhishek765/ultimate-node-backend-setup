import { Router } from 'express';
import { self } from '../controllers/apiController';

const router = Router();

router.route('/self').get(self);

export default router;
