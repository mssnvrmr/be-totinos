import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateOrderSchema, UpdateOrderSchema } from '../schemas/order.schema';

export const router = Router();

router.post('/', authenticate, validate(CreateOrderSchema), create);
router.get('/', getAll);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(UpdateOrderSchema), update);
router.delete('/:id', authenticate, remove);