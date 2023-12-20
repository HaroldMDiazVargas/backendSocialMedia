import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
