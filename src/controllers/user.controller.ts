import {
  register as registerService,
  login as loginService,
  getAll as getAllService,
  getByRole as getByRoleService,
  getById as getByIdService,
  getByEmail as getByEmailService,
  update as updateService,
  remove as removeService
} from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constants/user-roles';
import { UpdateUser } from '../schemas/user.schema';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({ name: result.name, token: result.token, role: result.role });
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const getByRole = async (req: Request<{ role: UserRole }>, res: Response, next: NextFunction) => {
  try {
    const users = await getByRoleService(req.params.role);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await getByIdService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const getByEmail = async (req: Request<{ email: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await getByEmailService(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request<{ id: string }> & { body: UpdateUser }, res: Response, next: NextFunction) => {
  try {
    const user = await updateService(req.params.id, req.body as UpdateUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await removeService(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}