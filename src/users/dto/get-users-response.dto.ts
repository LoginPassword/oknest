import { ApiProperty } from '@nestjs/swagger';
import { getUserResponseDto } from './get-user-response.dto';

export class getUsersResponseDto {
  @ApiProperty({ type: () => [getUserResponseDto] })
  rows: getUserResponseDto[];

  @ApiProperty()
  count: number;
}
