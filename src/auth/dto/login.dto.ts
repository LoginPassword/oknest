import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email or phone number for login', minLength: 5, maxLength: 60 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(60)
  emailOrPhoneNumber: string;

  @ApiProperty({ minLength: 6, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
