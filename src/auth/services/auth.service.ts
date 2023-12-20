import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models';
import { Repository } from 'typeorm';
import { Observable, switchMap, from, map } from 'rxjs';
import { IUser } from '../models';
import * as bcrypt from 'bcrypt';
import { AuthDto, LoginDto } from '../dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: AuthDto): Observable<IUser> {
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

  verifyUser(email: string, password: string): Observable<IUser> {
    return from(
      this.userRepository.findOne({
        where: {
          email,
        },
        select: ['id', 'firstName', 'lastName', 'age', 'email', 'password'],
      }),
    ).pipe(
      switchMap((user: IUser) => {
        if (!user)
          throw new HttpException(
            { status: HttpStatus.NOT_FOUND, error: 'Not found' },
            HttpStatus.NOT_FOUND,
          );
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValid: boolean) => {
            if (isValid) {
              delete user.password;
              return user;
            } else throw new ForbiddenException('Credentials incorrect');
          }),
        );
      }),
    );
  }

  login(dto: LoginDto): Observable<string> {
    return this.verifyUser(dto.email, dto.password).pipe(
      switchMap((user: IUser) => {
        if (user) {
          return from(this.jwt.signAsync({ user }));
        }
      }),
    );
  }
}
