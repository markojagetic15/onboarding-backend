import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@services/auth/auth.service';
import { LoginDto } from '@application/dto/auth/login.dto';
import { RegisterDto } from '@application/dto/auth/register.dto';
import { ResetPasswordDto } from '@application/dto/auth/reset-password.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/signup')
  async signup(@Body() body: RegisterDto) {
    return this.authService.signup(body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
