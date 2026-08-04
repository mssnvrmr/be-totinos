import { v4 as uuidv4 } from 'uuid';
import { CreateOrder } from '../schemas/order.schema';

export const CreateOrderModel = ({ orderedByUserEmail, items, status, note }: CreateOrder) => {
  return {
    id: uuidv4(),
    orderedByUserEmail,
    updatedByUserEmail: orderedByUserEmail,
    items,
    status,
    note: note ?? "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
