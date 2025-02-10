import { Router } from 'express';
const router = Router();
import { 
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../../controllers/userController.js';

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;