import express, { Request, Response, NextFunction } from "express";
import config from "./config";
import dbUtils from "./models/dbUtils";
import sendErrorToClient from "./utils/sendErrorToClient";
import CustomError from "./utils/error";
import decodeJwtMiddleware from "./middlewares/jwt";
import todoRouter from "./controllers/todo";
import userRouter from "./controllers/user";

dbUtils.createConnection();
const app = express();

app.use((req, _res, next) => {
    console.log("[PATH]: " + req.path);
    next();
});

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get( "/api/v1/ping", async (_req, res) => {
        res.status(200).send("I am Online!");
    }
);

app.use("api/v1/user", userRouter);
app.use("api/v1/todos", decodeJwtMiddleware, todoRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Handling Middleware called")
  console.error(err);
  if (err instanceof CustomError) {
      return sendErrorToClient(res, err);
  }
  next(err);
})

app.listen(config.port, () => {
    console.log(`Connected successfully on port ${config.port}`);
});
