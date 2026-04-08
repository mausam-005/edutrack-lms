import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../interfaces/IBaseRepository';
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
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
