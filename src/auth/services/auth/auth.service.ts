/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly usersService: UsersService
    ) { }
    async validateUser(username: string, password: string) {
        console.log('Inside validateUser')
        const userDB = await this.usersService.fetchUserByUserName(username)
        if (userDB) {
            console.log(userDB)
            return userDB
        }
        return null;
    }
}
