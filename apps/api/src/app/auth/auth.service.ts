import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// services
import { UserService } from '@api-server/app/user/user.service';
// models
import { IPayload } from '@api-server/app/models/payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  signPayload(payload: IPayload) {
    return this.jwtService.sign(payload);
  }

  validateUser(payload: IPayload) {
    return this.userService.findByPayload(payload);
  }
}
