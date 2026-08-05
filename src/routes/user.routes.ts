import { Router } from 'express';
import { register, login, getAll, getByRole, getById, getByEmail, update, remove } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, isAdmin, isAdminOrSelf } from '../middlewares/auth.middleware';
import { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from '../schemas/user.schema';

export const router = Router();

router.post('/register', validate(CreateUserSchema), register);
router.post('/login', validate(LoginUserSchema), login);
router.get('/', authenticate, isAdmin, getAll);
router.get('/role/:role', authenticate, isAdmin, getByRole);
router.get('/email/:email', authenticate, isAdmin, getByEmail);
router.get('/:id', authenticate, isAdminOrSelf, getById);
router.put('/:id', authenticate, isAdminOrSelf, validate(UpdateUserSchema), update);
router.delete('/:id', authenticate, isAdmin, remove);
