export type JLPTLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export interface IWord {
  word: string;
  reading: string;
  meaning: string;
}

export interface IKanji {
  character: string;
  level: JLPTLevel;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  strokeCount: number;
  imageUrl: string;
  on_examples: IWord[];
  kun_examples: IWord[];
}