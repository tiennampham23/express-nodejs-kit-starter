import { Request, Response } from "express";
import { HTTP_CODE, MESSAGE } from "../constants";
import { userService } from "../services";
import { error, generateHash, generateToken, success, verifyHash } from "../utils";

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {body} = req;
        const {username, password} = body;
        const existedUser = await userService.getUserByUserName(username);
        if (!existedUser) {
            return error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR); 
    }
        const isCorrectPassword = await verifyHash(password, existedUser.password);
        if (!isCorrectPassword) {
            return error(res, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.ERROR); 
        }
        const token = await generateToken({id: existedUser.id}, {expiresIn: "7d"});
        return success(res, token, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
    } catch (e) {
        console.log(e);
        return error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
    }
};

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {body} = req;
        const {username, password } = body;
        const existedUser = await userService.getUserByUserName(username);
        if (existedUser) {
            return error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR); 
        }
        const passwordHash = await generateHash(password);
        await userService.createUser(username, passwordHash);

        return success(res, null, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
    } catch (e) {
        console.error(e);
        return error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
    }
};


export default {
    login,
    register
};

