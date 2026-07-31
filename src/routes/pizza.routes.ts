import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/pizza.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreatePizzaSchema, UpdatePizzaSchema } from '../schemas/pizza.schema';

export const router = Router();

router.post('/', authenticate, validate(CreatePizzaSchema), create);
router.get('/', getAll);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(UpdatePizzaSchema), update);
router.delete('/:id', authenticate, remove);