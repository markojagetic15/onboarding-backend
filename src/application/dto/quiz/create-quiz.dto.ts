import { Question } from '@domain/quiz/Quiz.entity';

export class CreateQuizDto {
  questions: Question[];
  title: string;
  description: string;
  category: string;
}
