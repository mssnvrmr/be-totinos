import { z } from "zod";
import { OrderStatus } from "../constants/order-statuses";
import { getValidRecordKeysByEmail, getValidRecordKeysById } from "../utils/get-record-keys";

const emailFromUsersRecordSchema = z.string().refine(
  (email) => {
    const currentKeys = getValidRecordKeysByEmail("users.json");
    return currentKeys.includes(email);
  },
  { message: "The provided email does not match any user record in the database." }
);

const idFromPizzasRecordSchema = z.string().refine(
  (id) => {
    const currentKeys = getValidRecordKeysById("pizzas.json");
    return currentKeys.includes(id);
  },
  { message: "The provided id does not match any pizza record in the database." }
);

const idFromIngredientsRecordSchema = z.string().refine(
  (id) => {
    const currentKeys = getValidRecordKeysById("ingredients.json");
    return currentKeys.includes(id);
  },
  { message: "The provided id does not match any ingredient record in the database." }
);

export const OrderItemSchema = z.object({
  pizza: idFromPizzasRecordSchema,
  extras: z.array(idFromIngredientsRecordSchema),
  quantity: z.number().int().positive(),
});

export const OrderSchema = z.object({
  id: z.string(),
  orderedByUserEmail: emailFromUsersRecordSchema,
  updatedByUserEmail: emailFromUsersRecordSchema,
  items: z.array(OrderItemSchema),
  status: z.enum(OrderStatus),
  note: z.string().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const CreateOrderSchema = z.object({
  orderedByUserEmail: emailFromUsersRecordSchema,
  items: z.array(OrderItemSchema).min(1),
  status: z.enum(OrderStatus),
  note: z.string().optional(),
});

export const UpdateOrderSchema = z.object({
  updatedByUserEmail: emailFromUsersRecordSchema,
  items: z.array(OrderItemSchema).optional(),
  status: z.enum(OrderStatus).optional(),
  note: z.string().optional(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrder = z.infer<typeof UpdateOrderSchema>;
