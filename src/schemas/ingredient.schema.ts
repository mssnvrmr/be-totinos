import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number()
});

export const CreateIngredientSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number()
});

export const UpdateIngredientSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional()
});

export const GetIngredientNamesSchema = z.object({
  ids: z.preprocess(
    (val) => (typeof val === "string" ? [val] : val),
    z.array(z.string()).min(1)
  ),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type CreateIngredient = z.infer<typeof CreateIngredientSchema>;
export type UpdateIngredient = z.infer<typeof UpdateIngredientSchema>;
export type GetIngredientNames = z.infer<typeof GetIngredientNamesSchema>;
