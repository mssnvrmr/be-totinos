import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { CreateOrderSchema, UpdateOrderSchema } from '../schemas/order.schema';

export const router = Router();

router.post('/', authenticate, isAdmin, validate(CreateOrderSchema), create);
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, isAdmin, getById);
router.put('/:id', authenticate, isAdmin, validate(UpdateOrderSchema), update);
router.delete('/:id', authenticate, isAdmin, remove);