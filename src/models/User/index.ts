import mongoose from 'mongoose'

export interface IUser  {
  username: string;
  password: string;
};

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
});

const UserModel = mongoose.model<IUser>('UserProfile', userSchema);

export default UserModel;
