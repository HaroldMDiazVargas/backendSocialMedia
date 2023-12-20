import { Injectable } from '@nestjs/common';
import { IPost, PostEntity } from '../models';
import { IUser } from 'src/auth/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  createPost(user: IUser, post: IPost): Observable<IPost> {
    post.author = user;
    return from(this.postRepository.save(post));
  }

  updatePost(id: number, feedPost: IPost): Observable<UpdateResult> {
    return from(this.postRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }

  findPosts(take = 10, skip = 0): Observable<IPost[]> {
    return from(
      this.postRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.author', 'author')
        .orderBy('post.createdAt', 'DESC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }
}
