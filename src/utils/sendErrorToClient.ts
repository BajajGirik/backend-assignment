import { Response } from "express";
import CustomError from "./error";

const sendErrorToClient = (res: Response, err: CustomError) => {
    res.status(err.status).json({
        success: false,
        message: err.customMessage,
        details: err.details
    });
};

export default sendErrorToClient;
