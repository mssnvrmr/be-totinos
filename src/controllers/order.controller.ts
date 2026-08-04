import {
  create as createService,
  getAll as getAllService,
  getById as getByIdService,
  getByUserEmail as getByUserEmailService,
  update as updateService,
  remove as removeService
} from '../services/order.service';
import { Request, Response, NextFunction } from 'express';
import { CreateOrder, UpdateOrder } from '../schemas/order.schema';

export const create = async (req: Request & { body: CreateOrder }, res: Response, next: NextFunction) => {
  try {
    const order = await createService(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await getAllService();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const order = await getByIdService(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export const getByUserEmail = async (req: Request<{ userEmail: string }>, res: Response, next: NextFunction) => {
  try {
    const orders = await getByUserEmailService(req.params.userEmail);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request<{ id: string }> & { body: UpdateOrder }, res: Response, next: NextFunction) => {
  try {
    const order = await updateService(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const order = await removeService(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}