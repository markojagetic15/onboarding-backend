import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@domain/user/User.entity';
import { RegisterDto } from '@application/dto/auth/register.dto';
import { LoginDto } from '@application/dto/auth/login.dto';
import { UserRepository } from '@infrastructure/user.repository';
import { ResetPasswordDto } from '@application/dto/auth/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(body: LoginDto) {
    const { email, password } = body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new HttpException(
        {
          message: 'Password is incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { user };
  }

  async signup(body: RegisterDto) {
    const { first_name, last_name, email, password } = body;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser?.email === email) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const user = new User();

    user.id = uuidv4();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    const response = await this.userRepository.save(user);

    if (!response) {
      throw new HttpException(
        'Error saving user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { user };
  }

  async resetPassword(body: ResetPasswordDto) {
    const { id, password, old_password } = body;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== old_password) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    user.password = password;

    await this.userRepository.save(user);

    return new HttpException('Password reset successfully', HttpStatus.OK);
  }
}
