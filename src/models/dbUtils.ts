import mongoose from 'mongoose';
import config from '../config';

export default class dbUtils {
    static async createConnection() {
        try {
            await mongoose.connect(config.dbUrl);
            console.log("Mongo connected successfully!");
        } catch (err) {
            console.error(err);
        }

        // To handle errors after initial connection was established
        mongoose.connection.on("error", err => {
            console.error(err);
        });
    }

    static getMongoId(id: string | mongoose.Types.ObjectId) {
        return new mongoose.Types.ObjectId(id);
    }
}
