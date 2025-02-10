import { Router } from 'express';
const router = Router();
import userRoutes from '../routes/api/userRoutes.js';
import thoughtRoutes from '../routes/api/thoughtRoutes.js';
router.use('/api', userRoutes);
router.use('/thoughts', thoughtRoutes);
export default router;
