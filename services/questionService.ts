
import { QUESTION_BANK, Question } from '../data/questions';
import type { Problem, Subject, Difficulty } from '../types';
import { adminStorage } from './storageService';

// Helper para embaralhar um array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getQuestions = (topics: string[], difficulty: Difficulty, subject: Subject, count: number): Problem[] => {
  // 1. Get hardcoded questions
  const subjectBank = QUESTION_BANK[subject] || [];
  
  // 2. Get Custom Admin Questions
  const customQuestions = adminStorage.getCustomQuestions();
  
  // Filter custom questions that match the criteria (assuming custom questions store topic/subject/difficulty)
  // We need to map the stored format to the logic here.
  // The generic 'Problem' interface in types might need 'topic', 'difficulty' fields to be filterable.
  const relevantCustomQuestions = customQuestions.filter(q => 
      // Very basic matching, assuming admin puts correct topic IDs
      (q as any).difficulty === difficulty && topics.includes((q as any).topic)
  );

  // Merge
  const allQuestions = [...subjectBank, ...relevantCustomQuestions];

  const filteredQuestions = allQuestions.filter(q => 
    q.difficulty === difficulty && topics.includes(q.topic)
  );
  
  const shuffledPool = shuffleArray(filteredQuestions);

  // Limita o número de questões ao solicitado
  const finalQuestionPool = shuffledPool.slice(0, count);

  // Embaralha as opções dentro de cada questão da lista final
  const questionsWithShuffledOptions = finalQuestionPool.map(q => ({
    ...q,
    options: shuffleArray([...q.options]),
  }));
  
  return questionsWithShuffledOptions;
};
