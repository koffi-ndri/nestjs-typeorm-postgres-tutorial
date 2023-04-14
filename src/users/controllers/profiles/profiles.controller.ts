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
import { UserProfileDto } from 'src/users/dtos/User_profile_dto';
import { ProfilesService } from 'src/users/services/profiles/profiles.service';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.fetchProfile(id);
  }

  @Post('createProfile/:id')
  @UsePipes(new ValidationPipe())
  async createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfileDetails: UserProfileDto,
  ) {
    const result = await this.profileService.saveProfile(
      id,
      userProfileDetails,
    );
    if (!result)
      throw new HttpException(
        'Not able to create profile',
        HttpStatus.BAD_REQUEST,
      );

    return result;
  }
}
