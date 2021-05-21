import { Response } from "express";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { userService } from "../services";
import { error, success } from "../utils";

const getAll = async (req: RequestCustom, res: Response): Promise<void> => {
    try {
        const users = await userService.getUsers();
        return success(res, users, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
    } catch (e) {
        console.log(e);
        return error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
    }
};

export default {
    getAll
};

