import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { loginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('/registration')
  @ApiCreatedResponse({ type: loginResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Email or phone already exists' })
  async registration(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @ApiCreatedResponse({ type: loginResponseDto })
  @ApiBody({ type: LoginDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Email, phone number or password is incorrect' })
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
}
