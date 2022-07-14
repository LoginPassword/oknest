import { Controller, Get, UseGuards, Patch, Body, Query, Param, Delete, NotFoundException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getUsersResponseDto } from './dto/get-users-response.dto';
import { getUserResponseDto } from './dto/get-user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: getUsersResponseDto })
  @ApiBody({ type: GetAllUserDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  getUsers(@Query() getAllUserDto: GetAllUserDto) {
    return this.usersService.getAllAndCount(getAllUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: getUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: getUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Email or phone already exists' })
  async registration(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = await this.usersService.create(createUserDto);
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'ok' })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Email or phone already exists' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'ok' })
  @ApiUnauthorizedResponse({ description: 'JWT token is incorrect' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this.usersService.delete(id);
  }
}
