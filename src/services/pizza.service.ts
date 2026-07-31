import { readDB, writeDB } from '../utils/db';
import { Pizza, CreatePizza, UpdatePizza } from '../schemas/pizza.schema';
import { CreatePizzaModel } from '../models/pizza.model';
import { HttpError } from '../utils/http-error';

export const create = async ({ name, ingredients, description, price }: CreatePizza) => {
  const db = readDB("pizzas.json");

  const foundPizza = db.pizzas.find((pizza: Pizza) => pizza.name.toLowerCase() === name.toLowerCase());
  if (foundPizza) {
    throw new HttpError("Pizza already exists", 409);
  }

  const newPizza = CreatePizzaModel({ name, ingredients, description, price });
  db.pizzas.push(newPizza);
  writeDB("pizzas.json", db);

  return newPizza;
}

export const getAll = async () => {
  const db = readDB("pizzas.json");
  return db.pizzas;
}

export const getById = async (id: string) => {
  const db = readDB("pizzas.json");
  const pizza = db.pizzas.find((pizza: Pizza) => pizza.id === id);
  if (!pizza) {
    throw new HttpError("Pizza not found", 404);
  }

  return pizza;
}

export const update = async (id: string, { name, ingredients, description, price }: UpdatePizza) => {
  const db = readDB("pizzas.json");
  const pizza = db.pizzas.find((pizza: Pizza) => pizza.id === id);
  if (!pizza) {
    throw new HttpError("Pizza not found", 404);
  }
  pizza.name = name;
  pizza.ingredients = ingredients;
  pizza.description = description;
  pizza.price = price;
  writeDB("pizzas.json", db);

  return pizza;
}

export const remove = async (id: string) => {
  const db = readDB("pizzas.json");
  const pizza = db.pizzas.find((pizza: Pizza) => pizza.id === id);

  if (!pizza) {
    throw new HttpError("Pizza not found", 404);
  }

  db.pizzas = db.pizzas.filter((pizza: Pizza) => pizza.id !== id);
  writeDB("pizzas.json", db);

  return pizza;
}