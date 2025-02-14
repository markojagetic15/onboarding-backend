import { Controller, Get, Query } from '@nestjs/common';
import { GetQuestionsDto } from '@application/dto/auth/get-questions.dto';
import { QuizService } from '@services/quiz/quiz.service';

@Controller()
export class QuizController {
  constructor(private readonly questionService: QuizService) {}

  @Get('/quiz')
  async getQuestions(@Query() query: GetQuestionsDto) {
    return this.questionService.getQuestions(query);
  }

  @Get('/categories')
  async getCategories() {
    return this.questionService.getCategories();
  }

  @Get('/difficulties')
  async getDifficulties() {
    return this.questionService.getDifficulties();
  }

  @Get('/types')
  async getTypes() {
    return this.questionService.getTypes();
  }
}
