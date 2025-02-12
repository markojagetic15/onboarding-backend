import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '@application/dto/user/update-user.dto';
import { UserRepository } from '@infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(token: string) {
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const decode = jwt.decode(token);

    if (!decode) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findById((decode as JwtPayload).id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }

  async updateUser(id: string, body: UpdateUserDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, body);
    await this.userRepository.save(user);

    return { user };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return new HttpException('User deleted', HttpStatus.OK);
  }
}
