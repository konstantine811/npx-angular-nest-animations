import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// models
import { RegisterDto, LoginDto } from '@api-server/app/models/dto/user.dto';
import { IPayload } from '@api-server/app/models/payload';
// services
import { UserService } from '@api-server/app/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('message')
  @UseGuards(AuthGuard())
  getMessage() {
    return 'hello man';
  }

  @Post('login')
  async login(@Body(ValidationPipe) credentials: LoginDto) {
    const user = await this.userService.findByLogin(credentials);
    const payload: IPayload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body(ValidationPipe) credentials: RegisterDto) {
    const user = await this.userService.create(credentials);
    const payload: IPayload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
