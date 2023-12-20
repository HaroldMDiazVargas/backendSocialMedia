import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PostService } from '../services/post.service';
import { IUser } from 'src/auth/models';
import { IPost } from '../models';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private postService: PostService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params }: { user: IUser; params: { id: number } } = context
      .switchToHttp()
      .getRequest();

    if (!user || !params) return false;

    const userId = user.id;
    const postId = params.id;

    // Check if logged-in user is the same as the user creator post
    return this.postService.findPostById(postId).pipe(
      map((post: IPost) => {
        return post.author.id === userId;
      }),
    );
  }
}
