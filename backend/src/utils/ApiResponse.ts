import { Response } from 'express';

/**
 * ApiResponse — Standardized API Response Builder
 * 
 * SRP: This class is solely responsible for formatting API responses.
 * Ensures consistent response structure across the entire API.
 * 
 * Response format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data?: any,
 *   error?: { code: string, details?: any },
 *   meta?: { timestamp: string, requestId?: string }
 * }
 */
export class ApiResponse {
  /**
   * Send a success response
   */
  static success(
    res: Response,
    data: any = null,
    message: string = 'Success',
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Send a created response (201)
   */
  static created(
    res: Response,
    data: any,
    message: string = 'Resource created successfully'
  ): Response {
    return ApiResponse.success(res, data, message, 201);
  }

  /**
   * Send an error response
   */
  static error(
    res: Response,
    message: string = 'Something went wrong',
    statusCode: number = 500,
    errorCode?: string,
    details?: any
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error: {
        code: errorCode || `ERR_${statusCode}`,
        ...(details && { details }),
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Send a paginated response
   */
  static paginated(
    res: Response,
    data: any[],
    pagination: { page: number; limit: number; total: number; pages: number },
    message: string = 'Success'
  ): Response {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Send a no-content response (204)
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
