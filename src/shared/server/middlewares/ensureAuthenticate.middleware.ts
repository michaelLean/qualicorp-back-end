import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import securityConfig from '@config/security.config';
import AppError from '@shared/server/errors/appError.model';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 403);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, securityConfig.secret);
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 403);
  }
}
