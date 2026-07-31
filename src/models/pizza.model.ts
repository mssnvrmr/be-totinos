import { v4 as uuidv4 } from 'uuid';
import { CreatePizza } from '../schemas/pizza.schema';

export const CreatePizzaModel = ({ name, ingredients, description, price }: CreatePizza) => {
  return {
    id: uuidv4(),
    name,
    ingredients,
    description,
    price,
  };
}
