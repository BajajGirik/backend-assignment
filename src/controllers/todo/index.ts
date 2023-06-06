import express, { NextFunction, Response } from 'express'
import TodoService from '../../services/todo'
import { AuthenticatedRequest, ICreateTodoRequest, IUpdateTodoRequest } from '../../types/api'
import CustomError from '../../utils/error'

const todoRouter = express.Router()

todoRouter.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  try {
      const todos = await TodoService.getPaginatedTodos(req.userId!, page, limit);
      res.status(200).send(todos);
  } catch (err) {
      next(err);
  }
})

todoRouter.post('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // TODO: add JOI request validations for simplification
  const body: ICreateTodoRequest = req.body;
  if (!body.title) {
      return next(new CustomError("Pls provide title", 400));
  }
  if (!body.description) {
      return next(new CustomError("Pls provide description", 400));
  }

  try {
      const todos = await TodoService.create(req.userId!, body.title, body.description);
      res.status(200).send(todos);
  } catch (err) {
      next(err);
  }
})

todoRouter.put('/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // TODO: add JOI request validations for simplification
  const body: IUpdateTodoRequest = req.body;
  if (!body.isCompleted && !body.title && !body.description) {
      return next(new CustomError("Cannot have an empty request body", 400));
  }

  try {
      await TodoService.update(req.params.id, req.userId!, body);
      res.sendStatus(200);
  } catch (err) {
      next(err);
  }
})


todoRouter.delete('/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
      await TodoService.delete(req.params.id, req.userId!);
      res.sendStatus(200);
  } catch (err) {
      next(err);
  }
})

export default todoRouter;
