import {
  create as createService,
  getAll as getAllService,
  getById as getByIdService,
  update as updateService,
  remove as removeService
} from '../services/ingredient.service';
import { Request, Response, NextFunction } from 'express';
import { CreateIngredient, UpdateIngredient } from '../schemas/ingredient.schema';

export const create = async (req: Request & { body: CreateIngredient }, res: Response, next: NextFunction) => {
  try {
    const ingredient = await createService(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await getAllService();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
}

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const ingredient = await getByIdService(req.params.id);
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request<{ id: string }> & { body: UpdateIngredient }, res: Response, next: NextFunction) => {
  try {
    const ingredient = await updateService(req.params.id, req.body);
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await removeService(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}