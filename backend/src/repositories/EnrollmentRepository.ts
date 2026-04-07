import { Enrollment, IEnrollment } from '../models/Enrollment';
import { IEnrollmentRepository } from '../interfaces/IEnrollmentRepository';
import { BaseRepository } from './BaseRepository';

/**
 * EnrollmentRepository — Concrete Enrollment Data Access
 */
export class EnrollmentRepository extends BaseRepository<IEnrollment> implements IEnrollmentRepository {
  constructor() {
    super(Enrollment);
  }

  async findByStudentAndCourse(studentId: string, courseId: string): Promise<IEnrollment | null> {
    return this.model.findOne({ student: studentId, course: courseId }).exec();
  }

  async findByStudent(studentId: string): Promise<IEnrollment[]> {
    return this.model
      .find({ student: studentId })
      .populate({
        path: 'course',
        populate: { path: 'teacher', select: 'name email' },
      })
      .sort({ enrolledAt: -1 })
      .exec();
  }

  async findByCourse(courseId: string): Promise<IEnrollment[]> {
    return this.model
      .find({ course: courseId })
      .populate('student', 'name email')
      .sort({ enrolledAt: -1 })
      .exec();
  }

  async isEnrolled(studentId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.findByStudentAndCourse(studentId, courseId);
    return enrollment !== null;
  }
}
