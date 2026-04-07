import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { Logger } from '../utils/Logger';

const logger = Logger.createLogger('ErrorHandler');

/**
 * Global Error Handler Middleware
 * 
 * SRP: Only responsible for converting errors into HTTP responses.
 * Handles: ApiError, Mongoose errors, generic errors.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log all errors
  if (err instanceof ApiError && err.isOperational) {
    logger.warn(`Operational error: ${err.message}`, { statusCode: err.statusCode });
  } else {
    logger.error('Unhandled error:', err);
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: `ERR_${err.statusCode}`,
      },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: {
        code: 'ERR_VALIDATION',
        details: err.message,
      },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  // Mongoose duplicate key error
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: 'Duplicate entry. This resource already exists.',
      error: { code: 'ERR_DUPLICATE' },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      error: { code: 'ERR_INVALID_ID' },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: { code: 'ERR_INVALID_TOKEN' },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expired',
      error: { code: 'ERR_TOKEN_EXPIRED' },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  // Fallback: 500 Internal Server Error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: {
      code: 'ERR_INTERNAL',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
    meta: { timestamp: new Date().toISOString() },
  });
};
