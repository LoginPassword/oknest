import { Controller, Get, UseGuards, Request, Patch, Body } from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { getUserResponseDto } from 'src/users/dto/get-user-response.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: getUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  async getProfile(@Request() req: any) {
    return (await this.usersService.getById(req.user.id)).get();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'ok' })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  @ApiConflictResponse({ description: 'Email or phone already exists' })
  updateProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
