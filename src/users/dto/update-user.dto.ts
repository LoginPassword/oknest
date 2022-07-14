import { IsEmail, IsMobilePhone, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Only email, need email or phone number', maxLength: 60 })
  @IsOptional()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Only russian phone numbers, need email or phone number' })
  @IsOptional()
  @IsMobilePhone('ru-RU')
  phoneNumber: string;

  @ApiPropertyOptional({ minLength: 6, maxLength: 100 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiPropertyOptional({ minLength: 3, maxLength: 30 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
