import { ApiProperty } from '@nestjs/swagger';

export class loginResponseDto {
  @ApiProperty({ description: 'JWT token' })
  access_token: string;
}
