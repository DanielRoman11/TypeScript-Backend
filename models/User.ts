import mongoose, { model } from 'mongoose';
import IUser from '../interfaces/User.interface';
import userSchema from '../schemas/User.schema';

const User = model<IUser>('User', userSchema);

export default User;