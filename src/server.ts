import app from './app';
import config from './config';
import dbService from './service/dbService';
import logger from './utils/logger';

const server = app.listen(config.PORT);

async function startServer() {
  try {
    // Database connection
    await dbService.connectToMongoDB();

    logger.info('APPLICATION_STARTED', {
      meta: {
        port: config.PORT,
        server: config.SERVER_URL
      }
    });
  } catch (error) {
    logger.error('APPLICATION_ERROR', { meta: error });

    server.close((err) => {
      if (err) {
        logger.error('APPLICATION_ERROR', { meta: err });
      }
      process.exit(1);
    });
  }
}

startServer();
