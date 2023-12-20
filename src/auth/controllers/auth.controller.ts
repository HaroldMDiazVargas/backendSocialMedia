import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { AuthDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerAccount(@Body() user: AuthDto): Observable<IUser> {
    return this.authService.registerAccount(user);
  }
}
