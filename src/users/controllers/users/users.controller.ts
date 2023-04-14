/* eslint-disable prettier/prettier */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/Create_user_dto';
import { UpdateUserDto } from 'src/users/dtos/Update_user_dto';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  async getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUsers(@Body() userData: CreateUserDto) {
    const result = this.userService.createUser(userData);
    if (!result)
      throw new HttpException(
        'User not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return {
      message: 'User created successfully',
    };
  }

  @UseInterceptors(ClassSerializerInterceptor) // an other way to serialize 'User'
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fetchUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    const updated = await this.userService.editUser(id, userData);
    if (!updated)
      throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
    return {
      message: 'Updated successfully',
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.userService.deleteUser(id);
    if (!deleted)
      throw new HttpException('Deletion failed', HttpStatus.BAD_REQUEST);
    return {
      message: 'Deleted successfully',
    };
  }
}
