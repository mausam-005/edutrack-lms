import { Router } from 'express';
import { body } from 'express-validator';
import { MaterialController } from '../controllers/materialController';
import { authenticate } from '../middleware/auth';
import { roleGuard } from '../middleware/roleGuard';
import { validate } from '../middleware/validate';

const router = Router();

// Get course materials
router.get(
  '/courses/:id/materials',
  authenticate,
  MaterialController.getByCourse
);

// Add material (teacher only)
router.post(
  '/courses/:id/materials',
  authenticate,
  roleGuard('teacher', 'admin'),
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('type')
      .isIn(['pdf', 'link', 'text'])
      .withMessage('Type must be pdf, link, or text'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ]),
  MaterialController.create
);

// Delete material (teacher only)
router.delete(
  '/:id',
  authenticate,
  roleGuard('teacher', 'admin'),
  MaterialController.delete
);

export default router;
