import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// services
import { GoogleAuthService } from './google-auth.service';

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log(req);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleAuthService.googleLogin(req);
  }
}
