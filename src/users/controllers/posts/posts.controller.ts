/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from 'src/users/dtos/Create_post_dto';
import { PostsService } from 'src/users/services/posts/posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: CreatePostDto,
  ) {
    const result = await this.postsService.createPost(id, postData);
    if (!result)
      throw new HttpException(
        'Not able to create post',
        HttpStatus.BAD_REQUEST,
      );

    return result;
  }

  @Get()
  async getAllPosts() {
    return this.postsService.fetchAllPosts();
  }

  @Get(':id')
  async getUserPosts(@Param('id', ParseIntPipe) id: number) {
    const userPosts = await this.postsService.fetchUserPosts(id);
    //if(userPosts.length === 0) throw new HttpException('No posts', HttpStatus.NOT_FOUND);

    return userPosts;
  }
}
