import { Injectable } from '@nestjs/common';
import { UserRepository } from '@infrastructure/user.repository';
import { GetQuestionsDto } from '@application/dto/auth/get-questions.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { triviaCategories } from '../../data/categories';
import { triviaDifficulties } from '../../data/difficulties';
import { triviaTypes } from '../../data/types';

@Injectable()
export class QuizService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
  ) {}

  async getQuestions(query: GetQuestionsDto) {
    const { amount, category, difficulty, type } = query;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    const response = this.httpService.get(API);

    const questions = await firstValueFrom(response);

    return questions.data.results;
  }

  async getCategories() {
    return triviaCategories;
  }

  async getDifficulties() {
    return triviaDifficulties;
  }

  async getTypes() {
    return triviaTypes;
  }
}
