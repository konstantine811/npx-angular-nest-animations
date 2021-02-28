import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// own modules
import { UserModule } from '@api-server/app/user/user.module';
// controllers
import { AuthController } from './auth.controller';
// services
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
