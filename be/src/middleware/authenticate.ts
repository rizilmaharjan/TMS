import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.SECRET_KEY as string);
    res.locals.user = decoded_token;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized"});
  }
};
