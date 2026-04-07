import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollmentController';
import { authenticate } from '../middleware/auth';
import { roleGuard } from '../middleware/roleGuard';

const router = Router();

// Student enrolls in a course
router.post(
  '/courses/:id/enroll',
  authenticate,
  roleGuard('student'),
  EnrollmentController.enroll
);

// Check enrollment status
router.get(
  '/courses/:id/enrollment-status',
  authenticate,
  EnrollmentController.checkEnrollment
);

// Student views their enrollments
router.get(
  '/my',
  authenticate,
  roleGuard('student'),
  EnrollmentController.getMyEnrollments
);

// Teacher views course enrollments
router.get(
  '/courses/:id/students',
  authenticate,
  roleGuard('teacher', 'admin'),
  EnrollmentController.getCourseEnrollments
);

export default router;
