import mongoose from 'mongoose';

import config from '../config';
import { initRateLimiter } from '../config/rateLimiter';
import logger from '../utils/logger';

export default {
  // Mongo DB configuration
  connectToMongoDB: async () => {
    try {
      const conn = await mongoose.connect(config.MONGO_DB_URL);
      logger.info('MONGO_DB_CONNECTION_SUCCESS', {
        meta: {
          message: `Database connection established with ${conn.connection.name}`
        }
      });
      initRateLimiter(conn.connection);
      logger.info('RATE_LIMITER_INITIATED');
    } catch (error) {
      logger.error('MONGO_DATABASE_CONNECTION_ERROR', { meta: error });
    }
  }
  //   Other DB connections for ex: postgres
};
