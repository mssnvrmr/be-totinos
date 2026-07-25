import { Router } from 'express';
import { register, login, getAll, getByRole, getById, getByEmail, update, remove } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from '../schemas/user.schema';

export const router = Router();

router.post('/register', validate(CreateUserSchema), register);
router.post('/login', validate(LoginUserSchema), login);
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);
router.get('/role/:role', authenticate, getByRole);
router.get('/email/:email', authenticate, getByEmail);
router.put('/:id', authenticate, validate(UpdateUserSchema), update);
router.delete('/:id', authenticate, remove);
