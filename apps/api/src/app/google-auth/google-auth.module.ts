import { Module } from '@nestjs/common';
// services
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthService } from './google-auth.service';
// controller
import { GoogleAuthController } from './google-auth.controller';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
