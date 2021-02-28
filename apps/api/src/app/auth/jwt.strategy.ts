import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
// services
import { AuthService } from './auth.service';
// models
import { IPayload } from '@api-server/app/models/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false
      );
    }
    console.log(payload);
    return done(null, user, payload.iat);
  }
}
