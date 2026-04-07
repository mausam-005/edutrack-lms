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

/**
 * ============================================================
 * DEPENDENCY INJECTION CONTAINER
 * ============================================================
 * 
 * Centralizes the creation and wiring of all dependencies.
 * 
 * SOLID — Dependency Inversion Principle (DIP):
 * High-level modules (services) do not depend on low-level modules
 * (repositories). Both depend on abstractions (interfaces).
 * This container wires the concrete implementations together.
 * 
 * WHY: Instead of each service instantiating its own dependencies
 * (tight coupling), we inject them from a central location.
 * This makes the system testable (swap with mocks) and flexible
 * (swap implementations without modifying services).
 * 
 * SINGLETON: Each repository and service is instantiated once
 * and reused throughout the application lifecycle.
 */

// ── Repositories (Data Access Layer) ──────────────────────
const userRepository = new UserRepository();
const courseRepository = new CourseRepository();
const enrollmentRepository = new EnrollmentRepository();
const materialRepository = new MaterialRepository();
const quizRepository = new QuizRepository();
const resultRepository = new ResultRepository();

// ── Services (Business Logic Layer) ──────────────────────
// Each service receives its dependencies via constructor injection
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

// Quiz service with Strategy Pattern — use standard evaluation by default
const quizService = new QuizService(
  quizRepository,
  resultRepository,
  courseRepository,
  enrollmentRepository,
  EvaluationStrategyFactory.getStrategy('standard')
);

// ── Exports ──────────────────────────────────────────────
export const container = {
  // Repositories
  userRepository,
  courseRepository,
  enrollmentRepository,
  materialRepository,
  quizRepository,
  resultRepository,

  // Services
  authService,
  courseService,
  enrollmentService,
  materialService,
  quizService,
};
