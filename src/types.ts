export interface SpellingWord {
  word: string;
  phonetics: string;
  definition: string;
  sentence: string;
  clue: string;
}

export interface QuizSession {
  id: string;
  grade: string;
  theme: string;
  words: SpellingWord[];
  answers: Record<string, string>; // word -> child's typed answer
  scores: Record<string, boolean>; // word -> final correct/false
  completed: boolean;
  score: number; // raw correct count
  total: number; // total count
  unlockedBadge?: string; // id of badge unlocked, if any
  date: string; // ISO String
}

export interface Badge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TrackedProgress {
  theme: string;
  grade: string;
  successRate: number; // percentage
  wordsCount: number;
}
