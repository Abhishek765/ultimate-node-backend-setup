import mongoose from 'mongoose';

import config from '../config';
import logger from '../utils/logger';

export default {
  // Mongo DB configuration
  connectToMongoDB: async () => {
    try {
      const conn = await mongoose.connect(config.MONGO_DB_URL, {
        dbName: 'ultimate-node-db'
      });
      logger.info('MONGO_DB_CONNECTION_SUCCESS', {
        meta: {
          message: `Database connection established with ${conn.connection.name}`
        }
      });
    } catch (error) {
      logger.error('MONGO_DATABASE_CONNECTION_ERROR', { meta: error });
    }
  }
  //   Other DB connections for ex: postgres
};
