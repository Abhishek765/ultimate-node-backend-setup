import { NextFunction, Request, Response } from 'express';

import config from '../config';
import { rateLimiterMongo } from '../config/rateLimiter';
import { EApplicationEnvironment } from '../constants/application';
import responseMessages from '../constants/responseMessages';
import httpError from '../utils/httpError';

export default (req: Request, _res: Response, next: NextFunction) => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return next(); // Disable the rate limit for development
  }

  if (rateLimiterMongo) {
    rateLimiterMongo
      .consume(req.ip as string, 1)
      .then(() => {
        next();
      })
      .catch(() => {
        httpError(
          next,
          new Error(responseMessages.TOO_MANY_REQUESTS),
          req,
          429
        );
      });
  }
};
