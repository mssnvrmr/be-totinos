import { readDB, writeDB } from '../utils/db';
import { HttpError } from '../utils/http-error';
import { CreateOrderModel } from '../models/order.model';
import { Order, CreateOrder, OrderItem, UpdateOrder } from '../schemas/order.schema';
import { Ingredient } from '../schemas/ingredient.schema';
import { Pizza } from '../schemas/pizza.schema';
import { STOCK_PER_UNIT } from '../constants/stock';

const getRequiredStock = (items: OrderItem[], pizzas: Pizza[]) => {
  const required = new Map<string, number>();

  for (const item of items) {
    const pizza = pizzas.find((pizza: Pizza) => pizza.id === item.pizza);

    if (!pizza) {
      throw new HttpError(`Pizza not found: ${item.pizza}`, 404);
    }

    for (const ingredientId of [...pizza.ingredients, ...item.extras]) {
      const current = required.get(ingredientId) ?? 0;
      required.set(ingredientId, current + item.quantity * STOCK_PER_UNIT);
    }
  }

  return required;
}

const consumeStock = (items: OrderItem[]) => {
  const pizzasDB = readDB("pizzas.json");
  const ingredientsDB = readDB("ingredients.json");
  const required = getRequiredStock(items, pizzasDB.pizzas);

  const targets = [...required.entries()].map(([id, amount]) => {
    const ingredient = ingredientsDB.ingredients.find((ingredient: Ingredient) => ingredient.id === id);

    if (!ingredient) {
      throw new HttpError(`Ingredient not found: ${id}`, 404);
    }

    return { ingredient, amount };
  });

  const insufficient = targets
    .filter(({ ingredient, amount }) => ingredient.stock < amount)
    .map(({ ingredient }) => ingredient.name);

  if (insufficient.length > 0) {
    throw new HttpError(`Not enough stock for: ${insufficient.join(', ')}`, 409);
  }

  targets.forEach(({ ingredient, amount }) => {
    ingredient.stock -= amount;
  });

  writeDB("ingredients.json", ingredientsDB);
}

export const create = async ({ orderedByUserEmail, items, status, note }: CreateOrder) => {
  const db = readDB("orders.json");
  consumeStock(items);

  const newOrder = CreateOrderModel({ orderedByUserEmail, items, status, note });
  db.orders.push(newOrder);
  writeDB("orders.json", db);

  return newOrder;
}

export const getAll = async () => {
  const db = readDB("orders.json");
  return db.orders;
}

export const getById = async (id: string) => {
  const db = readDB("orders.json");
  const order = db.orders.find((order: Order) => order.id === id);
  if (!order) {
    throw new HttpError("Order not found", 404);
  }
  return order;
}

export const getByUserEmail = async (userEmail: string) => {
  const db = readDB("orders.json");
  const orders = db.orders.filter((order: Order) => order.orderedByUserEmail === userEmail);
  if (orders.length === 0) {
    throw new HttpError("No orders found for user", 404);
  }
  return orders;
}

export const update = async (id: string, { updatedByUserEmail, items, status, note }: UpdateOrder) => {
  const db = readDB("orders.json");
  const order = db.orders.find((order: Order) => order.id === id);

  if (!order) {
    throw new HttpError("Order not found", 404);
  }

  order.updatedByUserEmail = updatedByUserEmail;
  if (items !== undefined) order.items = items;
  if (status !== undefined) order.status = status;
  if (note !== undefined) order.note = note;
  order.updatedAt = new Date().toISOString();
  writeDB("orders.json", db);

  return order;
}

export const remove = async (id: string) => {
  const db = readDB("orders.json");
  const order = db.orders.find((order: Order) => order.id === id);

  if (!order) {
    throw new HttpError("Order not found", 404);
  }

  db.orders = db.orders.filter((order: Order) => order.id !== id);
  writeDB("orders.json", db);

  return order;
}
