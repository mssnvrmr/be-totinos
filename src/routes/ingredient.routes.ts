import { Router } from 'express';
import { create, getAll, getById, getNamesByIds, update, remove } from '../controllers/ingredient.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { CreateIngredientSchema, GetIngredientNamesSchema, UpdateIngredientSchema } from '../schemas/ingredient.schema';

export const router = Router();

router.post('/', authenticate, isAdmin, validate(CreateIngredientSchema), create);
router.post('/names', validate(GetIngredientNamesSchema), getNamesByIds);
router.get('/', getAll);
router.get('/:id', authenticate, isAdmin, getById);
router.put('/:id', authenticate, isAdmin, validate(UpdateIngredientSchema), update);
router.delete('/:id', authenticate, isAdmin, remove);