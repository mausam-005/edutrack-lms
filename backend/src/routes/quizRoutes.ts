import { Router } from 'express';
import { body } from 'express-validator';
import { QuizController } from '../controllers/quizController';
import { authenticate } from '../middleware/auth';
import { roleGuard } from '../middleware/roleGuard';
import { validate } from '../middleware/validate';

const router = Router();

// Get course quizzes
router.get(
  '/courses/:id/quizzes',
  authenticate,
  QuizController.getByCourse
);

// Create quiz (teacher only)
router.post(
  '/courses/:id/quizzes',
  authenticate,
  roleGuard('teacher', 'admin'),
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('questions')
      .isArray({ min: 1 })
      .withMessage('At least one question is required'),
    body('questions.*.questionText')
      .trim()
      .notEmpty()
      .withMessage('Question text is required'),
    body('questions.*.options')
      .isArray({ min: 2 })
      .withMessage('At least 2 options required'),
    body('questions.*.correctAnswer')
      .isInt({ min: 0 })
      .withMessage('Correct answer index is required'),
  ]),
  QuizController.create
);

// Attempt quiz (student only)
router.post(
  '/:id/attempt',
  authenticate,
  roleGuard('student'),
  validate([
    body('answers')
      .isArray({ min: 1 })
      .withMessage('Answers are required'),
  ]),
  QuizController.attempt
);

// Get single quiz by ID
router.get('/:id', authenticate, QuizController.getById);

// Get quiz results
router.get('/:id/results', authenticate, QuizController.getResults);

// Get all my results (student)
router.get(
  '/my/results',
  authenticate,
  roleGuard('student'),
  QuizController.getMyResults
);

export default router;
