import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDto extends LoginDto {}
