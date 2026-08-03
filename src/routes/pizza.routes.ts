import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/pizza.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { CreatePizzaSchema, UpdatePizzaSchema } from '../schemas/pizza.schema';

export const router = Router();

router.post('/', authenticate, isAdmin, validate(CreatePizzaSchema), create);
router.get('/', getAll);
router.get('/:id', authenticate, isAdmin, getById);
router.put('/:id', authenticate, isAdmin, validate(UpdatePizzaSchema), update);
router.delete('/:id', authenticate, isAdmin, remove);