import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDB, writeDB } from '../utils/db';
import { User, UpdateUser } from '../schemas/user.schema';
import { CreateUserModel } from '../models/user.model';
import { UserRole } from '../constants/user-roles';
import { HttpError } from '../utils/http-error';

const register = async ({ email, password, phone, role }: { email: string, password: string, phone: string, role: UserRole }) => {
    const db = readDB("users.json");
    const foundUser = db.users.find((user: User) => user.email === email);

    if (foundUser) {
        const error = new HttpError("User already exists", 409);
        throw error;
    }

    const hashedPassword = await hash(password, 10);
    const newUser: User = CreateUserModel({ email, password: hashedPassword, phone, role });
    db.users.push(newUser);
    writeDB("users.json", db);
    return newUser;
}

const login = async ({ email, password }: { email: string, password: string }) => {
    const db = readDB("users.json");

    const foundUser = db.users.find((user: User) => user.email === email);

    if (!foundUser) {
        const error = new HttpError("Email or password is incorrect", 401);
        throw error;
    }

    const isMatch = await compare(password, foundUser.password);

    if (!isMatch) {
        const error = new HttpError("Email or password is incorrect", 401);
        throw error;
    }

    const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
    
    return token;
}

const getAll = async () => {
    const db = readDB("users.json");
    return db.users.map(({ password, ...user }: User) => user);
}

const getByRole = async (role: UserRole) => {
    const db = readDB("users.json");
    return db.users.filter((user: User) => user.role === role).map(({ password, ...user }: User) => user);
}

const getById = async (id: string) => {
    const db = readDB("users.json");

    const foundUser = db.users.find((user: User) => user.id === id);

    if (!foundUser) {
        const error = new HttpError("User not found", 404);
        throw error;
    }

    const { password, ...userWithoutPassword } = foundUser;
    
    return userWithoutPassword;
}

const getByEmail = async (email: string) => {
    const db = readDB("users.json");

    const foundUser = db.users.find((user: User) => user.email === email);

    if (!foundUser) {
        const error = new HttpError("User not found", 404);
        throw error;
    }

    const { password, ...userWithoutPassword } = foundUser;
    
    return userWithoutPassword;
}

const update = async (id: string, { email, password: newPassword, phone, role }: UpdateUser) => {
    const db = readDB("users.json");

    const index = db.users.findIndex((user: User) => user.id === id);

    if (index === -1) {
        const error = new HttpError("User not found", 404);
        throw error;
    }

    db.users[index] = { ...db.users[index], ...{ email, password: newPassword ? await hash(newPassword, 10) : db.users[index].password, phone, role }, id };
    writeDB("users.json", db);

    const { password, ...userWithoutPassword } = db.users[index];
    return userWithoutPassword;
}

const remove = async (id: string) => {
    const db = readDB("users.json");

    const index = db.users.findIndex((user: User) => user.id === id);

    if (index === -1) {
        const error = new HttpError("User not found", 404);
        throw error;
    }

    db.users.splice(index, 1);
    writeDB("users.json", db);
}

export { register, login, getAll, getByRole, getById, getByEmail, update, remove };