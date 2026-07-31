import { z } from "zod";
import { getValidRecordKeysById } from "../utils/get-record-keys";

const idFromIngredientsRecordSchema = z.string().refine(
  (id) => {
    const currentKeys = getValidRecordKeysById("ingredients.json");
    return currentKeys.includes(id);
  },
  { message: "The provided id does not match any ingredient record in the database." }
);

export const PizzaSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(idFromIngredientsRecordSchema),
  price: z.number()
});

export const CreatePizzaSchema = z.object({
  name: z.string(),
  ingredients: z.array(idFromIngredientsRecordSchema),
  description: z.string().optional(),
  price: z.number()
});

export const UpdatePizzaSchema = z.object({
  name: z.string().optional(),
  ingredients: z.array(idFromIngredientsRecordSchema).optional(),
  description: z.string().optional(),
  price: z.number().optional()
});

export type Pizza = z.infer<typeof PizzaSchema>;
export type CreatePizza = z.infer<typeof CreatePizzaSchema>;
export type UpdatePizza = z.infer<typeof UpdatePizzaSchema>;