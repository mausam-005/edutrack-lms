import { User, IUser } from '../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).exec();
  }
  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).select('+password').exec();
  }
  async findByRole(role: string): Promise<IUser[]> {
    return this.model.find({ role }).exec();
  }
}
