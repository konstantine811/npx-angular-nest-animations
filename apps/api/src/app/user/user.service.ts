import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// libs
import * as bcrypt from 'bcryptjs';
// model
import { User } from './user.schema';
import { LoginDto, RegisterDto } from '@api-server/app/models/dto/user.dto';
import { IPayload } from '@api-server/app/models/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDto: RegisterDto) {
    const { username } = userDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDto: LoginDto) {
    const { username, password } = userDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credeintials', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  findByPayload(payload: IPayload) {
    const { username } = payload;
    return this.userModel.findOne({ username });
  }
}
