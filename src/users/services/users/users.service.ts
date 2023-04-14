/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/typeorm/entities/User';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFoundExceptions';
import { CreateUserParams, SerializedUser, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async fetchUsers() {
    const result = await this.userRepository.find({ relations: ['profile'] });
    return result.map(user => plainToClass(SerializedUser, user))
  }


  async fetchUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFoundException();
    return new SerializedUser(user)
  }

  
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  editUser(id: number, userData: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...userData });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  fetchUserByUserName(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
