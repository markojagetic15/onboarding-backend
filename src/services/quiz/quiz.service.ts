import { Injectable } from '@nestjs/common';
import { GetQuestionsDto } from '@application/dto/quiz/get-questions.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { triviaCategories } from '../../data/categories';
import { triviaDifficulties } from '../../data/difficulties';
import { triviaTypes } from '../../data/types';
import { CreateQuizDto } from '@application/dto/quiz/create-quiz.dto';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { Quiz } from '@domain/quiz/Quiz.entity';
import { GetQuizzesDto } from '@application/dto/quiz/get-quizzes.dto';

@Injectable()
export class QuizService {
  constructor(private readonly httpService: HttpService) {}

  async getQuestions(query: GetQuestionsDto) {
    const { amount, category, difficulty, type } = query;

    const response = this.httpService.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
    );

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

  async createQuiz(body: CreateQuizDto): Promise<Quiz> {
    const { title, description, questions, category } = body;

    const quizzes = JSON.parse(
      fs.readFileSync('src/data/quizzes.json', 'utf-8'),
    );

    const quiz = {
      id: uuidv4(),
      questions,
      title,
      description,
      category,
    };

    quizzes.push(quiz);

    fs.writeFileSync('src/data/quizzes.json', JSON.stringify(quizzes, null, 2));

    return quiz;
  }

  async updateQuiz(id: string, body: CreateQuizDto): Promise<Quiz> {
    const { title, description, questions } = body;

    const quizzes = JSON.parse(
      fs.readFileSync('src/data/quizzes.json', 'utf-8'),
    );

    const quizIndex = quizzes.findIndex((quiz: Quiz) => quiz.id === id);

    if (quizIndex === -1) {
      return null;
    }

    quizzes[quizIndex] = {
      id,
      title,
      description,
      questions,
    };

    fs.writeFileSync('src/data/quizzes.json', JSON.stringify(quizzes, null, 2));

    return quizzes[quizIndex];
  }

  async getQuizzes(query: GetQuizzesDto): Promise<Quiz[]> {
    const { search } = query;

    const quizzes = JSON.parse(
      fs.readFileSync('src/data/quizzes.json', 'utf-8'),
    );

    if (!quizzes) {
      return [];
    }

    if (search) {
      return quizzes.filter((quiz: Quiz) =>
        quiz.title.toLowerCase().trim().includes(search.toLowerCase().trim()),
      );
    }

    return quizzes;
  }

  async deleteQuiz(id: string) {
    const quizzes = JSON.parse(
      fs.readFileSync('src/data/quizzes.json', 'utf-8'),
    );

    const quizIndex = quizzes.findIndex((quiz: Quiz) => quiz.id === id);

    if (quizIndex === -1) {
      return null;
    }

    quizzes.splice(quizIndex, 1);

    fs.writeFileSync('src/data/quizzes.json', JSON.stringify(quizzes, null, 2));

    return null;
  }
}
