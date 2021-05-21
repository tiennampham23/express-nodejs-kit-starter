import { Response } from "express";

export const success = (
    res: Response,
    data: unknown,
    status: number,
    message: string
): void => {
    res.status(status);
    res.json({
        data,
        success: true,
        message
    });
};

export const error = (
    res: Response,
    data: unknown,
    status: number,
    message: string,
): void => {
    res.status(status).json({
        message,
        data,
        success: false,
    });
};