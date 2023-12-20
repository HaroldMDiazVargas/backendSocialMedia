import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IPost } from '../models';
import { IUser } from 'src/auth/models';

export class CreatePostDto implements IPost {
  @IsString()
  @IsNotEmpty()
  body: string;
}
