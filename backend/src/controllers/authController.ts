import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { container } from '../config/container';
import { ApiResponse } from '../utils/ApiResponse';
export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, password, role } = req.body;
      const result = await container.authService.register(name, username, email, password, role);
      ApiResponse.created(res, result, 'Registration successful');
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;
      const result = await container.authService.login(identifier, password);
      ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await container.authService.getProfile(req.user!._id.toString());
      ApiResponse.success(res, { user });
    } catch (error) {
      next(error);
    }
  }
}
