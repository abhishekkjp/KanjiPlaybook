export type JLPTLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export interface Word {
  word: string;
  reading: string;
  meaning: string;
}

export interface Kanji {
  _id: string;
  character: string;
  level: JLPTLevel;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  strokeCount: number;
  imageUrl: string;
  words: Word[];
}

export interface KanjiResponse {
  kanji: Kanji[];
  total: number;
  page: number;
  totalPages: number;
}