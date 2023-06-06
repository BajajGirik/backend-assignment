import mongoose from 'mongoose'

export interface ITodo<T = mongoose.Types.ObjectId>  {
  title: string;
  description: string;
  isCompleted: boolean;
  userId: T;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  isCompleted: {
      type: Boolean,
      default: false,
      require: true
  },
  userId: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true
  }
}, {timestamps: true});

const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);

export default TodoModel;
