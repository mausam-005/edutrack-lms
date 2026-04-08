import { IUser } from '../models/User';
import { IBaseRepository } from './IBaseRepository';
export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findByEmailWithPassword(email: string): Promise<IUser | null>;
  findByRole(role: string): Promise<IUser[]>;
}
