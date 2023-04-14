/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
    // constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        return req.body
     }
}
