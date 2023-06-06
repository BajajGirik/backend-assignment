import TodoModel from "../../models/Todo";
import dbUtils from "../../models/dbUtils";
import { IGetPaginatedTodosResponse, IUpdateTodoRequest } from "../../types/api";

export default class TodoService {
    static async getPaginatedTodos(userId: string, page: number, limit: number): Promise<IGetPaginatedTodosResponse> {
        const totalDocCount = await TodoModel.countDocuments({ userId: dbUtils.getMongoId(userId) });
        const offSet = (page - 1) * limit;

        const pageInfo: IGetPaginatedTodosResponse["pageInfo"] = {
            currentPage: page,
            totalPages: Math.ceil(totalDocCount / limit),
            itemsPerPage: limit
        };

        if (totalDocCount === 0 || offSet > totalDocCount) {
            return {
                data: [],
                pageInfo
            };
        }

        const todos = await TodoModel.find({ userId: dbUtils.getMongoId(userId) })
            .sort({ createdAt: -1 }).skip(offSet).limit(limit).lean();

        return {
            data: todos,
            pageInfo
        }
    }

    static async create(userId: string, title: string, description: string) {
        const createdTodo = await TodoModel.create({
            userId: dbUtils.getMongoId(userId),
            title,
            description,
            isCompleted: false
        });

        return createdTodo;
    }

    static async update(id: string, userId: string, payload: IUpdateTodoRequest) {
        const updatedTodo = await TodoModel.updateOne(
            { _id: dbUtils.getMongoId(id), userId: dbUtils.getMongoId(userId) },
            { "$set": payload },
            { new: true }
        ).lean();

        return updatedTodo;
    }

    static async delete(id: string, userId: string) {
        await TodoModel.deleteOne({ _id: dbUtils.getMongoId(id), userId: dbUtils.getMongoId(userId) });
    }
}
