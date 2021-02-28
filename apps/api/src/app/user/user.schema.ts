import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
  } catch (err) {
    return next(err);
  }
});
