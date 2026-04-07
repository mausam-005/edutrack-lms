import { User, IUser } from '../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';

/**
 * UserRepository — Concrete User Data Access
 * 
 * INHERITANCE: Extends BaseRepository to inherit generic CRUD.
 * SRP: Only responsible for user-specific database queries.
 * DIP: Implements IUserRepository interface.
 */
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
