
export type Subject = 'mathematics' | 'portuguese' | 'english';

export interface Problem {
  problem: string;
  options: (string | number)[];
  answer: string | number;
  // Optional because legacy/hardcoded questions might not have it strictly typed in JSON yet, 
  // but new ones will.
  topic?: string; 
  difficulty?: Difficulty;
}

export type GameStatus = 'character-selection' | 'subject-selection' | 'topic-selection' | 'playing' | 'level-complete' | 'store' | 'soccer-challenge' | 'soccer-game' | 'admin';

export type Difficulty = 'Fichinha' | 'Eu me Viro' | 'Desafiador';

export interface Topic {
    id: string;
    label: string;
}

// Allow string for custom characters created in Admin
export type CharacterType = 'kitten' | 'dog' | 'parrot' | 'kangaroo' | 'panda' | 'lion' | 'monkey' | 'penguin' | 'fox' | 'robot' | 'alien' | 'zombie' | 'hamster' | 'tiger' | 'unicorn' | 'dragon' | 'rabbit' | 'bear' | 'mouse' | 'pig' | string;

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  isCustom?: boolean;
  emoji?: string; // For custom items
}

export interface Tattoo {
    id: string;
    name: string;
    cost: number;
}

export interface GameEvent {
    id: string;
    name: string;
    multiplier: number;
    active: boolean;
    // Scheduling
    daysOfWeek?: number[]; // 0=Sun, 1=Mon, ...
    startHour?: number; // 0-23
    endHour?: number; // 0-23
    // Visual Effects
    isRedScreen?: boolean;
    isSuperParty?: boolean;
}

export type AccountType = 'Jogador' | 'VIP' | 'Admin' | 'Deus';
