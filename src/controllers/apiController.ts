import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessages from '../constants/responseMessages';
import httpError from '../utils/httpError';

export const self = (req: Request, res: Response, next: NextFunction) => {
  try {
    httpResponse(req, res, 200, responseMessages.SUCCESS, { id: 'id' });
  } catch (err) {
    httpError(next, err, req, 500);
  }
};
