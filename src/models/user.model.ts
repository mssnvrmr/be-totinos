import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from '../schemas/user.schema';

export const CreateUserModel = ({ username, email, password, phone, role }: CreateUser) => {
  return {
    id: uuidv4(),
    username,
    email,
    password,
    phone,
    createdAt: new Date().toISOString(),
    role,
  };
}
