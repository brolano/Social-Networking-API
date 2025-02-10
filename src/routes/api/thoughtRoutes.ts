import express, { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
} from '../../controllers/thoughtController';

// Create router instance
const router: Router = express.Router();

// Define routes with proper types
router.get('/', getThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

export default router;