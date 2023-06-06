import UserModel from "../../models/User";
import CustomError from "../../utils/error";
import bcrypt from "bcryptjs";

export default class UserService {
    static async login(username: string, password: string) {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new CustomError("Username or passoword is incorrect", 403);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new CustomError("Username or passoword is incorrect", 403);
        }

        return user;
    }

    static async register(username: string, password: string) {
        const user = await UserModel.findOne({ username });
        if (user) {
            throw new CustomError("Forbidden", 403);
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: encryptedPassword,
        });
    }
}
