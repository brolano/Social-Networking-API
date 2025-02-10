import { Router, Request, Response } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/userController';


interface UserRequestParams {
    id: string;
  }
  
  interface User {
    id: string;
    // Add other user properties here
    name?: string;
    email?: string;
    // etc.
  }
  
  // Define custom request types
  interface TypedRequestParams<T> extends Request {
    params: T;
  }
  
  interface TypedRequestBody<T> extends Request {
    body: T;
  }



const router: Router = Router();

// Define routes with typed request handlers
router.route('/')
  .get(async (req: Request, res: Response) => {
    return await getUsers(req, res);
  })
  .post(async (req: TypedRequestBody<User>, res: Response) => {
    return await createUser(req, res);
  });

router.route('/:id')
  .get(async (req: TypedRequestParams<UserRequestParams>, res: Response) => {
    return await getUserById(req, res);
  })
  .put(async (req: TypedRequestParams<UserRequestParams> & TypedRequestBody<User>, res: Response) => {
    return await updateUser(req, res);
  })
  .delete(async (req: TypedRequestParams<UserRequestParams>, res: Response) => {
    return await deleteUser(req, res);
  });

export default router;