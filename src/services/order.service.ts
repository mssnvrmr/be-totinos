import { readDB, writeDB } from '../utils/db';
import { HttpError } from '../utils/http-error';
import { CreateOrderModel } from '../models/order.model';
import { Order, CreateOrder, UpdateOrder } from '../schemas/order.schema';

export const create = async ({ orderedByUserEmail, items, status, note }: CreateOrder) => {
  const db = readDB("orders.json");
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
