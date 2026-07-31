import { v4 as uuidv4 } from 'uuid';
import { CreateOrder } from '../schemas/order.schema';

export const CreateOrderModel = ({ orderedByUserEmail, pizzas, status, note }: CreateOrder) => {
  return {
    id: uuidv4(),
    orderedByUserEmail,
    updatedByUserEmail: orderedByUserEmail,
    pizzas: pizzas.map((id) => id),
    status,
    note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
