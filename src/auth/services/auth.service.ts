import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { Observable, switchMap, from, map } from 'rxjs';
import { IUser } from '../models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: IUser): Observable<IUser> {
    const { firstName, lastName, age, email, password } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword,
          }),
        ).pipe(
          map((user: IUser) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
}
