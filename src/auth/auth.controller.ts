import {
  Get,
  Controller,
  Post,
  UsePipes,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { createUserSchema } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedRequest } from './dto/token.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginDto))
  login(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;

    const access_token = this.authService.createToken(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    return {
      message: 'Login exitoso',
      user: user,
    };
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout exitoso' };
  }
}
