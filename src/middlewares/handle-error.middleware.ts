import { NextFunction, Request, Response } from "express";

export const throwAsNext = (f: (req: Request, res: Response, next: NextFunction) => void) =>
 async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      f(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  