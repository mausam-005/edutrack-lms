import { Response } from 'express';
export class ApiResponse {
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
  static created(
    res: Response,
    data: any,
    message: string = 'Resource created successfully'
  ): Response {
    return ApiResponse.success(res, data, message, 201);
  }
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
  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
