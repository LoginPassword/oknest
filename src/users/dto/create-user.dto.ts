import { IsEmail, ValidateIf, IsNotEmpty, IsMobilePhone, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Only email, need email or phone number', maxLength: 60 })
  @ValidateIf((o) => !o.phoneNumber || o.email)
  @MaxLength(60)
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Only russian phone numbers, need email or phone number' })
  @ValidateIf((o) => o.phoneNumber || !o.email)
  @IsMobilePhone('ru-RU')
  phoneNumber: string;

  @ApiProperty({ minLength: 6, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiProperty({ minLength: 3, maxLength: 30 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
