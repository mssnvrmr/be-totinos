import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { router as userRoutes } from "./routes/user.routes";

import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
