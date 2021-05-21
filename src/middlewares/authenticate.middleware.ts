 import { NextFunction, Response } from "express";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { userService } from "../services";
import { error, verifyToken } from "../utils";
import logger from "../utils/logger";
  export const authMiddleware = async (req: RequestCustom, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    if (authorization && authorization.match(/^Bearer /g)) {
      const token = authorization.split(" ")[1];
      if (token) {
        try {
          const tokenDecoded = await verifyToken(token);
          const userId = tokenDecoded.id;
          const user = await userService.getUserById(userId);
          if (user) {
            req.userId = tokenDecoded.id;
            return next();
          }
          return error(res, null, HTTP_CODE.ERROR, MESSAGE.AUTH.INVALID_TOKEN);
        } catch (err) {
          logger.error(err);
          return error(res, null, HTTP_CODE.ERROR, MESSAGE.AUTH.INVALID_TOKEN);
        }
      }
      return error(res, null, HTTP_CODE.ERROR, MESSAGE.AUTH.INVALID_TOKEN);

    }
    return error(res, null, HTTP_CODE.ERROR, MESSAGE.AUTH.MISSING_TOKEN);
  };
