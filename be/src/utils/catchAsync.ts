import { NextFunction, Request, Response } from "express";

export const catchAsync = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any, Record<string, any>>>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
