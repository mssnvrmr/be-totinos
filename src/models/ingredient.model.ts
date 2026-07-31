import { v4 as uuidv4 } from 'uuid';
import { CreateIngredient } from '../schemas/ingredient.schema';

export const CreateIngredientModel = ({ name, price, stock }: CreateIngredient) => {
  return {
    id: uuidv4(),
    name,
    price,
    stock
  };
}
