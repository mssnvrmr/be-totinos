import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from '../schemas/user.schema';

export const CreateUserModel = ({ email, password, phone, role }: CreateUser) => {
    return {
        id: uuidv4(),
        email,
        password,
        phone,
        createdAt: new Date().toISOString(),
        role,
    };
}
