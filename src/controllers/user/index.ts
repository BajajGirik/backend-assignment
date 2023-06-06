import express from 'express'
import jwt from "jsonwebtoken";
import CustomError from '../../utils/error'
import UserService from '../../services/user'
import config from '../../config';

const userRouter = express.Router()

userRouter.post('/login', async (req, res, next) => {
    const body = req.body;
    // TODO: Add joi validations
    if (!body.username) {
        return next(new CustomError("Pls provide username", 400));
    }
    if (!body.password) {
        return next(new CustomError("Pls provide password", 400));
    }

    try {
        const user = await UserService.login(body.username, body.password);
        const token = jwt.sign(
            { userId: user._id.toString(), username: user.username },
            config.jwtToken,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).json({
            success: true,
            jwtToken: token
        });
    } catch (err) {
        next(err);
    }
})

userRouter.post('/register-dummy-user', async (_req, res, next) => {
    const username = "test123";
    const password = "test123";

    try {
        await UserService.register(username, password);
        res.status(200).json({
            success: true,
            message: "Ideally, password shouldn't be sent!",
            dummyUserInfo: {
                username,
                password
            }
        });
    } catch (err) {
        next(err);
    }
});

export default userRouter;
