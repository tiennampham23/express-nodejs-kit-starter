import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware, throwAsNext } from "../middlewares";

const path = "/v1/user";
const router = Router();


router.get("/all", authMiddleware, throwAsNext(userController.getAll));
export default {
    path,
    router
};
