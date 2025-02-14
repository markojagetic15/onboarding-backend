export class CreateQuizDto {
  questions: {
    question: string;
    correct_answer: string;
    type: string;
    difficulty: string;
    category: number;
  }[];
  title: string;
  description: string;
  category: string;
}
