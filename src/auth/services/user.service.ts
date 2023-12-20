import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models';
import { Observable, from } from 'rxjs';
import { UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  updateUser(id: number, dto: UpdateUserDto): Observable<UpdateResult> {
    const data = this.userRepository.create(dto);
    return from(this.userRepository.update(id, { ...data }));
  }
}
