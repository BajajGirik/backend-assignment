import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { AuthenticatedRequest } from "../types/api";
import sendErrorToClient from "../utils/sendErrorToClient";
import CustomError from "../utils/error";

const decodeJwtMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      sendErrorToClient(res, new CustomError("Invalid Token", 400));
      return;
    }
    // const isCustomAuth  = token && token.length < 500;
    let decodedData: jwt.JwtPayload | string | null = null;
    decodedData = jwt.verify(token, config.jwtToken);
    if (decodedData) {
      if (decodedData.sub) req.userId = decodedData.sub as string;
      if ((decodedData as jwt.JwtPayload).id) req.userId = (decodedData as jwt.JwtPayload).id;
    }
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    sendErrorToClient(res, new CustomError("Invalid Token", 400));
  }
};

export default decodeJwtMiddleware;
