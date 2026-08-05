import { Request, Response, NextFunction } from 'express';
import { User } from '../schemas/user.schema';
import { UserRole } from '../constants/user-roles';
import { OrderStatus } from '../constants/order-statuses';
import { getById } from '../services/order.service';

/** Admins may apply any update; everyone else may only cancel their own active order. */
export const canUpdateOrder = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const user = (req as Request<{ id: string }> & { user?: User }).user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (user.role === UserRole.ADMIN) {
    return next();
  }

  try {
    const order = await getById(req.params.id);
    const { status, updatedByUserEmail, ...otherFields } = req.body ?? {};

    const ownsOrder = order.orderedByUserEmail === user.email;
    const cancelsActiveOrder =
      order.status === OrderStatus.ACTIVE && status === OrderStatus.CANCELLED;
    const changesNothingElse = Object.keys(otherFields).length === 0;
    const actsAsSelf = updatedByUserEmail === undefined || updatedByUserEmail === user.email;

    if (!ownsOrder || !cancelsActiveOrder || !changesNothingElse || !actsAsSelf) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
