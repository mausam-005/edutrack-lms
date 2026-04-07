import { Router } from 'express';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import enrollmentRoutes from './enrollmentRoutes';
import materialRoutes from './materialRoutes';
import quizRoutes from './quizRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/materials', materialRoutes);
router.use('/quizzes', quizRoutes);

export default router;
