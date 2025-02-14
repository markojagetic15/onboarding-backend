export class Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export class Question {
  question: string;
  correct_answer: string;
  type: string;
  difficulty: string;
  category: number;
  options?: string[];
}
