import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { router as userRoutes } from "./routes/user.routes";
import { router as ingredientRoutes } from "./routes/ingredient.routes";
import { router as pizzaRoutes } from "./routes/pizza.routes";
import { router as orderRoutes } from "./routes/order.routes";

import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://fe-totinos-7ix4vaxw9-missnvrmr.vercel.app"],
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
