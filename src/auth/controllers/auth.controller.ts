import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';
import { IUser } from '../models/user.interface';
import { AuthDto, LoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: AuthDto): Observable<IUser> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() dto: LoginDto): Observable<{ access_token: string }> {
    return this.authService
      .login(dto)
      .pipe(map((jwt: string) => ({ access_token: jwt })));
  }
}
