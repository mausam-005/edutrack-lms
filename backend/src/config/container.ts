import { UserRepository } from '../repositories/UserRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { MaterialRepository } from '../repositories/MaterialRepository';
import { QuizRepository, ResultRepository } from '../repositories/QuizRepository';
import { AuthService } from '../services/authService';
import { CourseService } from '../services/courseService';
import { EnrollmentService } from '../services/enrollmentService';
import { MaterialService } from '../services/materialService';
import { QuizService } from '../services/quizService';
import { EvaluationStrategyFactory } from '../patterns/QuizEvaluationStrategy';
const userRepository = new UserRepository();
const courseRepository = new CourseRepository();
const enrollmentRepository = new EnrollmentRepository();
const materialRepository = new MaterialRepository();
const quizRepository = new QuizRepository();
const resultRepository = new ResultRepository();
const authService = new AuthService(userRepository);
const courseService = new CourseService(courseRepository);
const enrollmentService = new EnrollmentService(
  enrollmentRepository,
  courseRepository
);
const materialService = new MaterialService(
  materialRepository,
  courseRepository
);
const quizService = new QuizService(
  quizRepository,
  resultRepository,
  courseRepository,
  enrollmentRepository,
  EvaluationStrategyFactory.getStrategy('standard')
);
export const container = {
  userRepository,
  courseRepository,
  enrollmentRepository,
  materialRepository,
  quizRepository,
  resultRepository,
  authService,
  courseService,
  enrollmentService,
  materialService,
  quizService,
};
