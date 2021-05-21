import { Router } from "express";
import { authController } from "../controllers";
import { throwAsNext } from "../middlewares";

const path = "/v1/auth";
const router = Router();


router.post("/login", throwAsNext(authController.login));
router.post("/register", throwAsNext(authController.register));
export default {
    path,
    router
};
