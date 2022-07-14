import {
  IsEmail,
  IsMobilePhone,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  Max,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

enum sortEnum {
  id,
  email,
  phoneNumber,
  name,
  createdAt,
  updatedAt,
}

enum orderEnum {
  asc,
  desc,
}

class Filter {
  @ApiPropertyOptional({ name: 'filter[id]', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;

  @ApiPropertyOptional({ name: 'filter[email]', maxLength: 60 })
  @IsOptional()
  @MaxLength(60)
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ name: 'filter[phoneNumber]', maxLength: 60 })
  @IsOptional()
  @MaxLength(60)
  @IsMobilePhone('ru-RU')
  phoneNumber: string;

  @ApiPropertyOptional({ name: 'filter[name]', minLength: 3, maxLength: 30 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}

export class GetAllUserDto {
  @ApiPropertyOptional({ type: () => Filter })
  @ValidateNested()
  @Type(() => Filter)
  filter: Filter;

  @ApiPropertyOptional({ minimum: 0, maximum: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  limit: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;

  @ApiPropertyOptional({ enum: sortEnum })
  @IsOptional()
  @IsIn(['id', 'email', 'phoneNumber', 'name', 'createdAt', 'updatedAt'])
  sort: string;

  @ApiPropertyOptional({ enum: orderEnum })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: string;
}
