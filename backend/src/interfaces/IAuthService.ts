import { IUser } from '../models/User';
export interface IAuthService {
  register(
    name: string,
    email: string,
    password: string,
    role: 'student' | 'teacher'
  ): Promise<{ user: IUser; token: string }>;
  login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }>;
  getProfile(userId: string): Promise<IUser>;
  generateToken(userId: string): string;
}
