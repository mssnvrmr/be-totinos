import jwt from 'jsonwebtoken';
import { readDB, writeDB } from '../utils/db';
import { Ingredient, CreateIngredient, UpdateIngredient } from '../schemas/ingredient.schema';
import { CreateIngredientModel } from '../models/ingredient.model';
import { HttpError } from '../utils/http-error';

const create = async ({ name, price, stock }: CreateIngredient) => {
  const db = readDB("ingredients.json");
  const foundIngredient = db.ingredients.find((ingredient: Ingredient) => ingredient.name.toLowerCase() === name.toLowerCase());

  if (foundIngredient) {
    throw new HttpError("Ingredient already exists", 409);
  }

  const ingredient = CreateIngredientModel({ name, price, stock });
  db.ingredients.push(ingredient);
  writeDB("ingredients.json", db);

  return ingredient;
}

const getAll = async () => {
  const db = readDB("ingredients.json");
  return db.ingredients;
}

const getById = async (id: string) => {
  const db = readDB("ingredients.json");
  const ingredient = db.ingredients.find((ingredient: Ingredient) => ingredient.id === id);

  if (!ingredient) {
    const error = new HttpError("Ingredient not found", 404);
    throw error;
  }

  return ingredient;
}

const update = async (id: string, { name, price, stock }: UpdateIngredient) => {
  const db = readDB("ingredients.json");
  const ingredient = db.ingredients.find((ingredient: Ingredient) => ingredient.id === id);
  if (!ingredient) {
    const error = new HttpError("Ingredient not found", 404);
    throw error;
  }

  ingredient.name = name || ingredient.name;
  ingredient.price = price || ingredient.price;
  ingredient.stock = stock || ingredient.stock;

  writeDB("ingredients.json", db);
  return ingredient;
}

const remove = async (id: string) => {
  const db = readDB("ingredients.json");

  const index = db.ingredients.findIndex((ingredient: Ingredient) => ingredient.id === id);

  if (index === -1) {
    const error = new HttpError("Ingredient not found", 404);
    throw error;
  }

  db.ingredients.splice(index, 1);
  writeDB("ingredients.json", db);
};

export { create, getAll, getById, update, remove };