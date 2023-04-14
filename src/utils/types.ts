/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';

export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};
export type UpdateUserParams = {
  username: string;
  email: string;
};

export type CreateProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  date_of_birth: Date;
};

export type CreatePostParams = {
  title: string;
  description: string;
};

export class SerializedUser {
  // username: string;
  // email: string;

  @Exclude()
  password: string; //to exclude password when showing the list of users in the response body

  constructor(partial: Partial<SerializedUser>){
    Object.assign(this, partial);
  }
}
