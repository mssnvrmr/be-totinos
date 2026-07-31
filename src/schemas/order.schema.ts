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

export const OrderSchema = z.object({
  id: z.string(),
  orderedByUserEmail: emailFromUsersRecordSchema,
  updatedByUserEmail: emailFromUsersRecordSchema,
  pizzas: z.array(idFromPizzasRecordSchema),
  status: z.enum(OrderStatus),
  note: z.string().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const CreateOrderSchema = z.object({
  orderedByUserEmail: emailFromUsersRecordSchema,
  pizzas: z.array(idFromPizzasRecordSchema),
  status: z.enum(OrderStatus),
  note: z.string().optional(),
});

export const UpdateOrderSchema = z.object({
  updatedByUserEmail: emailFromUsersRecordSchema,
  pizzas: z.array(idFromPizzasRecordSchema).optional(),
  status: z.enum(OrderStatus).optional(),
  note: z.string().optional(),
  updatedAt: z.iso.datetime(),
});

export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrder = z.infer<typeof UpdateOrderSchema>;
