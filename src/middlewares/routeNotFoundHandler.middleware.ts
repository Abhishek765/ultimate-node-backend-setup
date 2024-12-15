import { NextFunction, Request, Response } from 'express';

import responseMessages from '../constants/responseMessages';
import httpError from '../utils/httpError';

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessages.NOT_FOUND('route'));
  } catch (error) {
    httpError(next, error, req, 404);
  }
};
