import { QUESTION_BANK } from '../data/questions';
import type { Problem, Subject, Difficulty } from '../types';

// Helper para embaralhar um array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getQuestions = (topics: string[], difficulty: Difficulty, subject: Subject, count: number): Problem[] => {
  const subjectBank = QUESTION_BANK[subject];
  if (!subjectBank) {
    return [];
  }

  const filteredQuestions = subjectBank.filter(q => 
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