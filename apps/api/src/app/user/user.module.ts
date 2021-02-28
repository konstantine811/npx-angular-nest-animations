import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// services
import { UserService } from './user.service';
// schema
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
