import { Router } from 'express';
import { create, getAll, getById, update, remove, getByUserEmail } from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { canUpdateOrder } from '../middlewares/order.middleware';
import { CreateOrderSchema, UpdateOrderSchema } from '../schemas/order.schema';

export const router = Router();

router.post('/', authenticate, validate(CreateOrderSchema), create);
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, isAdmin, getById);
router.get('/user/:userEmail', authenticate, getByUserEmail);
router.put('/:id', authenticate, canUpdateOrder, validate(UpdateOrderSchema), update);
router.delete('/:id', authenticate, isAdmin, remove);