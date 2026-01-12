
export type Subject = 'mathematics' | 'portuguese' | 'english';

export interface Problem {
  problem: string;
  options: (string | number)[];
  answer: string | number;
}

export type GameStatus = 'character-selection' | 'subject-selection' | 'topic-selection' | 'playing' | 'level-complete' | 'store' | 'soccer-challenge' | 'soccer-game';

export type Difficulty = 'Fichinha' | 'Eu me Viro' | 'Desafiador';

export interface Topic {
    id: string;
    label: string;
}

export type CharacterType = 'kitten' | 'dog' | 'parrot' | 'kangaroo' | 'cellphone' | 'robot' | 'panda' | 'sixseven';

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
}

export interface Tattoo {
    id: string;
    name: string;
    cost: number;
}
