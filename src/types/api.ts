import { Request } from "express";
import { ITodo } from "../models/Todo";

/**
 * Extras provided: userId(optional), token(optional)
 */
export interface AuthenticatedRequest extends Request {
  userId?: string;
  token?: string;
}

export interface ICreateTodoRequest {
    title: string;
    description: string;
};

export interface IUpdateTodoRequest extends Partial<ICreateTodoRequest> {
    isCompleted?: boolean;
}

export interface IGetPaginatedTodosResponse {
    data: ITodo[],
    pageInfo: {
        currentPage: number;
        totalPages: number;
        itemsPerPage: number;
    }
}
