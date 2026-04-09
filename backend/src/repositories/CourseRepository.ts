import { Course, ICourse } from '../models/Course';
import { ICourseRepository, ICourseQuery } from '../interfaces/ICourseRepository';
import { IPaginatedResult } from '../interfaces/IBaseRepository';
import { BaseRepository } from './BaseRepository';
export class CourseRepository extends BaseRepository<ICourse> implements ICourseRepository {
  constructor() {
    super(Course);
  }
  async findPaginated(query: ICourseQuery): Promise<IPaginatedResult<ICourse>> {
    const { page = 1, limit = 12, search, category, teacher } = query;
    const filter: Record<string, any> = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (category) {
      filter.category = category;
    }
    if (teacher) {
      filter.teacher = teacher;
    }
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate('teacher', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
  async findDistinctCategories(): Promise<string[]> {
    return this.model.distinct('category').exec();
  }
  async incrementEnrollmentCount(courseId: string): Promise<void> {
    await this.model.findByIdAndUpdate(courseId, {
      $inc: { enrollmentCount: 1 },
    }).exec();
  }
  async findById(id: string): Promise<ICourse | null> {
    return this.model.findById(id).populate('teacher', 'name email avatar').exec();
  }
}
