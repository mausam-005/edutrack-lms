import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { ApiError } from '../utils/ApiError';

export const roleGuard = (...allowedRoles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`
        )
      );
    }

    next();
  };
};
