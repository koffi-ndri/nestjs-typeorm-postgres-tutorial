/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { CreatePostParams } from 'src/utils/types';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  fetchAllPosts() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async fetchUserPosts(id: number) {
    const posts = await createQueryBuilder('posts')
      .innerJoinAndSelect('posts.users', 'users')
      .where('users.id = :id', { id })
      .getOne();

    return posts;
  }

  async createPost(id: number, postData: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const createdPost = this.postRepository.create(postData);
    return this.postRepository.save({
      ...createdPost,
      user,
    });
  }
}
