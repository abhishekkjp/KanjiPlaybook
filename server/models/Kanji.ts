import { Schema, model, Document } from 'mongoose';
import { IKanji, IWord, JLPTLevel } from '../types/kanji';

export interface IKanjiDocument extends IKanji, Document {}

const WordSchema = new Schema<IWord>({
  word: { type: String, required: true },
  reading: { type: String, required: true },
  meaning: { type: String, required: true },
});

const KanjiSchema = new Schema<IKanjiDocument>(
  {
    character: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ['N1', 'N2', 'N3', 'N4', 'N5'] as JLPTLevel[],
      required: true,
    },
    onyomi: { type: [String], default: [] },
    kunyomi: { type: [String], default: [] },
    meaning: { type: String, required: true },
    strokeCount: { type: Number, required: true },
    imageUrl: { type: String, default: '' },
    words: { type: [WordSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// index for fast level queries
KanjiSchema.index({ level: 1 });

const Kanji = model<IKanjiDocument>('Kanji', KanjiSchema);

export default Kanji;