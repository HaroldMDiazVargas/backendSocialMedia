import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { IPost } from '../models';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  create(@Req() req, @Body() dto: CreatePostDto): Observable<IPost> {
    return this.postService.createPost(req.user, dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: IPost,
  ): Observable<UpdateResult> {
    return this.postService.updatePost(id, feedPost);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number): Observable<DeleteResult> {
    return this.postService.deletePost(id);
  }

  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 0,
  ): Observable<IPost[]> {
    take = take > 20 ? 20 : take;
    return this.postService.findPosts(take, skip);
  }
}
