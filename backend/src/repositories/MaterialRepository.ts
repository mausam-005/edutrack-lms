import { Material, IMaterial } from '../models/Material';
import { IMaterialRepository } from '../interfaces/IMaterialRepository';
import { BaseRepository } from './BaseRepository';
export class MaterialRepository extends BaseRepository<IMaterial> implements IMaterialRepository {
  constructor() {
    super(Material);
  }
  async findByCourse(courseId: string): Promise<IMaterial[]> {
    return this.model
      .find({ course: courseId })
      .sort({ order: 1 })
      .exec();
  }
  async findLastOrder(courseId: string): Promise<number> {
    const lastMaterial = await this.model
      .findOne({ course: courseId })
      .sort({ order: -1 })
      .exec();
    return lastMaterial ? lastMaterial.order : -1;
  }
}
