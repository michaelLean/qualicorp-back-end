import { NextFunction, Response, Request } from 'express';
import AppError from '@shared/server/errors/appError.model';

export default function errorHandling(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ success: false, data: {}, message: err.message });
  }

  return response
    .status(500)
    .json({ success: false, data: {}, message: 'Internal server error' });
}
