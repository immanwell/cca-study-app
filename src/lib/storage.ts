export interface QuizState {
  questions: string[];
  currentIndex: number;
  answers: Record<string, number>;
  seen: string[];
}

export interface FlashcardState {
  cards: string[];
  currentIndex: number;
}

export interface Progress {
  totalAnswered: number;
  correct: number;
  byDomain: Record<string, { total: number; correct: number }>;
}

const STORAGE_KEYS = {
  QUIZ_STATE: 'cca-quiz-state',
  FLASHCARD_STATE: 'cca-flashcard-state',
  PROGRESS: 'cca-progress',
};

export function getQuizState(): QuizState {
  if (typeof window === 'undefined') return defaultQuizState();
  const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_STATE);
  return stored ? JSON.parse(stored) : defaultQuizState();
}

export function saveQuizState(state: QuizState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.QUIZ_STATE, JSON.stringify(state));
}

export function getFlashcardState(): FlashcardState {
  if (typeof window === 'undefined') return defaultFlashcardState();
  const stored = localStorage.getItem(STORAGE_KEYS.FLASHCARD_STATE);
  return stored ? JSON.parse(stored) : defaultFlashcardState();
}

export function saveFlashcardState(state: FlashcardState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.FLASHCARD_STATE, JSON.stringify(state));
}

export function getProgress(): Progress {
  if (typeof window === 'undefined') return defaultProgress();
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return stored ? JSON.parse(stored) : defaultProgress();
}

export function saveProgress(progress: Progress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

function defaultQuizState(): QuizState {
  return {
    questions: [],
    currentIndex: 0,
    answers: {},
    seen: [],
  };
}

function defaultFlashcardState(): FlashcardState {
  return {
    cards: [],
    currentIndex: 0,
  };
}

function defaultProgress(): Progress {
  return {
    totalAnswered: 0,
    correct: 0,
    byDomain: {},
  };
}
