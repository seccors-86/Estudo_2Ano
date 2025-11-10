export type Subject = 'mathematics' | 'portuguese';

export interface Problem {
  problem: string;
  options: (string | number)[];
  answer: string | number;
}

export type GameStatus = 'character-selection' | 'subject-selection' | 'topic-selection' | 'playing' | 'level-complete' | 'store';

export type Difficulty = 'Fichinha' | 'Eu me Viro' | 'Desafiador';

export interface Topic {
    id: string;
    label: string;
}

export type CharacterType = 'cat' | 'dog';

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
}
