import { Injectable } from '@nestjs/common';
import { IPost, PostEntity } from '../models';
import { IUser } from 'src/auth/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, switchMap } from 'rxjs';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';

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

  updatePost(id: number, feedPost: IPost): Observable<IPost> {
    return from(this.postRepository.update(id, feedPost)).pipe(
      switchMap(() => {
        return this.findPostById(id);
      }),
    );
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.postRepository.softDelete(id));
  }

  findPosts(take = 10, skip = 0, pattern = ''): Observable<IPost[]> {
    return from(
      this.postRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.author', 'author')
        .orderBy('post.createdAt', 'DESC')
        .take(take)
        .skip(skip)
        .where({
          body: ILike(`%${pattern}%`),
        })
        .getMany(),
    );
  }

  findPostById(id: number): Observable<IPost> {
    return from(
      this.postRepository.findOne({
        where: { id },
        relations: ['author'],
        select: ['author'],
      }),
    );
  }
}
