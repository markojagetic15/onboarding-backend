import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetQuestionsDto } from '@application/dto/quiz/get-questions.dto';
import { QuizService } from '@services/quiz/quiz.service';
import { CreateQuizDto } from '@application/dto/quiz/create-quiz.dto';
import { GetQuizzesDto } from '@application/dto/quiz/get-quizzes.dto';

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/questions')
  async getQuestions(@Query() query: GetQuestionsDto) {
    return this.quizService.getQuestions(query);
  }

  @Get('/categories')
  async getCategories() {
    return this.quizService.getCategories();
  }

  @Get('/difficulties')
  async getDifficulties() {
    return this.quizService.getDifficulties();
  }

  @Get('/types')
  async getTypes() {
    return this.quizService.getTypes();
  }

  @Post('/quizzes')
  async createQuiz(@Body() body: CreateQuizDto) {
    return this.quizService.createQuiz(body);
  }

  @Put('/quizzes/:id')
  async updateQuiz(@Param('id') id: string, @Body() body: CreateQuizDto) {
    return this.quizService.updateQuiz(id, body);
  }

  @Get('/quizzes')
  async getQuizzes(@Query() query: GetQuizzesDto) {
    return this.quizService.getQuizzes(query);
  }

  @Delete('/quizzes/:id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
