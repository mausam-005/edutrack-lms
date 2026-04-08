import bcrypt from 'bcryptjs';
import { IUser } from '../models/User';
interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}
abstract class BaseUserBuilder {
  protected name: string;
  protected email: string;
  protected hashedPassword: string;
  constructor(name: string, email: string, hashedPassword: string) {
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
  abstract getRole(): 'student' | 'teacher' | 'admin';
  abstract getDefaultAvatar(): string;
  build(): Partial<IUser> {
    return {
      name: this.name,
      email: this.email,
      password: this.hashedPassword,
      role: this.getRole(),
      avatar: this.getDefaultAvatar(),
    };
  }
}
class StudentBuilder extends BaseUserBuilder {
  getRole(): 'student' {
    return 'student';
  }
  getDefaultAvatar(): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.name)}&backgroundColor=4f46e5`;
  }
}
class TeacherBuilder extends BaseUserBuilder {
  getRole(): 'teacher' {
    return 'teacher';
  }
  getDefaultAvatar(): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.name)}&backgroundColor=059669`;
  }
}
class AdminBuilder extends BaseUserBuilder {
  getRole(): 'admin' {
    return 'admin';
  }
  getDefaultAvatar(): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.name)}&backgroundColor=dc2626`;
  }
}
export class UserFactory {
  private static readonly SALT_ROUNDS = 12;
  static async createUserData(dto: CreateUserDTO): Promise<Partial<IUser>> {
    const salt = await bcrypt.genSalt(UserFactory.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const builder = UserFactory.getBuilder(dto.role, dto.name, dto.email, hashedPassword);
    return builder.build();
  }
  private static getBuilder(
    role: string,
    name: string,
    email: string,
    hashedPassword: string
  ): BaseUserBuilder {
    switch (role) {
      case 'student':
        return new StudentBuilder(name, email, hashedPassword);
      case 'teacher':
        return new TeacherBuilder(name, email, hashedPassword);
      case 'admin':
        return new AdminBuilder(name, email, hashedPassword);
      default:
        return new StudentBuilder(name, email, hashedPassword);
    }
  }
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
