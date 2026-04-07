import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../interfaces/IBaseRepository';

/**
 * BaseRepository<T> — Generic Repository Implementation
 * 
 * DESIGN PATTERNS:
 * - Template Method: Provides common CRUD implementation that subclasses inherit.
 *   Subclasses can override methods to customize behavior.
 * 
 * SOLID PRINCIPLES:
 * - SRP: This class is solely responsible for generic database operations.
 * - OCP: Subclasses extend without modifying base behavior.
 * - LSP: Any subclass can substitute for BaseRepository.
 * - DIP: Implements IBaseRepository abstraction.
 * 
 * OOP CONCEPTS:
 * - Encapsulation: The Mongoose model is a private member.
 * - Inheritance: Concrete repositories extend this base class.
 * - Abstraction: Hides Mongoose implementation details behind the interface.
 */
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  // Encapsulation — model is protected so subclasses can access it
  // but external code cannot
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: Record<string, any>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(filter: Record<string, any> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async count(filter: Record<string, any> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
