import { NextFunction, Request, Response } from 'express';

import responseMessages from '../constants/responseMessages';
import httpError from '../utils/httpError';
import httpResponse from '../utils/httpResponse';

export const self = (req: Request, res: Response, next: NextFunction) => {
  try {
    httpResponse(req, res, 200, responseMessages.SUCCESS);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};
