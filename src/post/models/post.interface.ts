import { IUser } from 'src/auth/models/user.interface';

export interface IPost {
  id?: number;
  body?: string;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
}
