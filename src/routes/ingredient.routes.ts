import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/ingredient.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateIngredientSchema, UpdateIngredientSchema } from '../schemas/ingredient.schema';

export const router = Router();

router.post('/', authenticate, validate(CreateIngredientSchema), create);
router.get('/', getAll);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(UpdateIngredientSchema), update);
router.delete('/:id', authenticate, remove);