import {
  create as createService,
  getAll as getAllService,
  getById as getByIdService,
  update as updateService,
  remove as removeService
} from '../services/pizza.service';
import { Request, Response, NextFunction } from 'express';
import { CreatePizza, UpdatePizza } from '../schemas/pizza.schema';

export const create = async (req: Request & { body: CreatePizza }, res: Response, next: NextFunction) => {
  try {
    const pizza = await createService(req.body);
    res.status(201).json(pizza);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pizzas = await getAllService();
    res.status(200).json(pizzas);
  } catch (error) {
    next(error);
  }
}

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const pizza = await getByIdService(req.params.id);
    res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request<{ id: string }> & { body: UpdatePizza }, res: Response, next: NextFunction) => {
  try {
    const pizza = await updateService(req.params.id, req.body);
    res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const pizza = await removeService(req.params.id);
    res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
}