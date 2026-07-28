import { ZodType } from "zod";
import { RequestHandler } from "express";

export const validate =
  <T>(schema: ZodType<T>): RequestHandler =>
    (req, res, next) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          message: "Validation error",
          errors: result.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      req.body = result.data;
      next();
    };