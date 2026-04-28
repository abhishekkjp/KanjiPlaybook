import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Kanji from '../models/Kanji';
import { JLPTLevel } from '../types/kanji';

dotenv.config();

interface KanjiEntry {
  strokes: number;
  grade?: number;
  freq?: number;
  jlpt_old?: number;
  jlpt_new?: number;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
  wk_level?: number;
  wk_meanings?: string[];
  wk_readings_on?: string[];
  wk_readings_kun?: string[];
  wk_radicals?: string[];
}

interface KanjiData {
  [character: string]: KanjiEntry;
}

const jlptMap: Record<number, JLPTLevel> = {
  1: 'N1',
  2: 'N2',
  3: 'N3',
  4: 'N4',
  5: 'N5',
};

const seed = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');

    await Kanji.deleteMany({});
    console.log('Cleared existing kanji');

    const jsonPath = path.join(__dirname, 'kanji.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const kanjiData: KanjiData = JSON.parse(raw);

    console.log(`Total kanji in file: ${Object.keys(kanjiData).length}`);

    const kanjiDocs = [];

    for (const [character, entry] of Object.entries(kanjiData)) {
      const jlptLevel = entry.jlpt_new;

      if (!jlptLevel || !jlptMap[jlptLevel]) continue;

      const level = jlptMap[jlptLevel];
      const meaning = entry.meanings.join(', ');
      if (!meaning) continue;

      kanjiDocs.push({
        character,
        level,
        onyomi: entry.readings_on ?? [],
        kunyomi: entry.readings_kun ?? [],
        meaning,
        strokeCount: entry.strokes ?? 0,
        imageUrl: '',
        words: [],
      });
    }

    console.log(`Inserting ${kanjiDocs.length} JLPT kanji...`);
    await Kanji.insertMany(kanjiDocs);
    console.log('Seed complete ✅');

    for (const level of ['N1', 'N2', 'N3', 'N4', 'N5'] as JLPTLevel[]) {
      const count = kanjiDocs.filter((k) => k.level === level).length;
      console.log(`  ${level}: ${count} kanji`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();