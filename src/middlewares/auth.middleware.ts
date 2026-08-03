import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../schemas/user.schema';
import { UserRole } from '../constants/user-roles';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    (req as Request & { user?: User }).user = decoded as User;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as Request & { user?: User }).user;
  if (user?.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};  