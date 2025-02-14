import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '@application/controllers/user/user.controller';
import { AuthController } from '@application/controllers/auth/auth.controller';
import { UserService } from '@services/user/user.service';
import { AuthService } from '@services/auth/auth.service';
import { UserRepository } from '@infrastructure/user.repository';
import { QuizController } from '@application/controllers/quiz/quiz.controller';
import { QuizService } from '@services/quiz/quiz.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
  ],
  controllers: [UserController, AuthController, QuizController],
  providers: [UserService, AuthService, UserRepository, QuizService],
})
export class AppModule {}
