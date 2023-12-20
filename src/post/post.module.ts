import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { PostEntity } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([PostEntity])],
})
export class PostModule {}
