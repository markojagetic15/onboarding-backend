import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '@application/controllers/user/user.controller';
import { AuthController } from '@application/controllers/auth/auth.controller';
import { UserService } from '@services/user/user.service';
import { AuthService } from '@services/auth/auth.service';
import { UserRepository } from '@infrastructure/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, UserRepository],
})
export class AppModule {}
