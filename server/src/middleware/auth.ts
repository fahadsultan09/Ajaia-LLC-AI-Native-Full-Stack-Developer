import { Request, Response, NextFunction } from "express";

export const mockAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.userId =
    (req.headers["x-user-id"] as string) ||
    "user_alice";

  next();
};