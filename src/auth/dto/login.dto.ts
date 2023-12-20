import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../models/user.interface';

export class LoginDto implements IUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
