import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Kanji from '../models/Kanji';
import { IWord } from '../types/kanji';

dotenv.config();

const stripOkurigana = (reading: string): string =>
  reading.replace(/\..+$/, '').replace(/[-]/g, '');

const matchesReading = (wordReading: string, kanjiReading: string): boolean => {
  const clean = stripOkurigana(kanjiReading);
  if (!clean) return false;
  return wordReading.includes(clean);
};

const enrich = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');

    console.log('Loading jmdict.json...');
    const jsonPath = path.join(__dirname, 'jmdict.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const jmdict = JSON.parse(raw);
    const entries = jmdict.words;
    console.log(`Total JMdict entries: ${entries.length}`);

    // build map: kanji character → [{word, reading, meaning}]
    const wordMap = new Map<string, IWord[]>();

    for (const entry of entries) {
      const kanjiForms = entry.kanji ?? [];
      const readingForms = entry.kana ?? [];
      const senses = entry.sense ?? [];

      if (kanjiForms.length === 0) continue;

      const word: string = kanjiForms[0]?.text;
      const reading: string = readingForms[0]?.text;
      if (!word || !reading) continue;

      // get first english gloss
      const meaning: string =
        senses[0]?.gloss?.find((g: any) => g.lang === 'eng')?.text ?? '';
      if (!meaning) continue;

      // map each kanji character in the word
      const uniqueChars = [...new Set(word.split(''))].filter((c) =>
        /[\u4e00-\u9fff]/.test(c)
      );

      for (const char of uniqueChars) {
        if (!wordMap.has(char)) wordMap.set(char, []);
        wordMap.get(char)!.push({ word, reading, meaning });
      }
    }

    console.log(`Built word map for ${wordMap.size} unique kanji`);

    const allKanji = await Kanji.find({});
    console.log(`Enriching ${allKanji.length} kanji...`);

    let enriched = 0;

    for (const kanji of allKanji) {
      const words = wordMap.get(kanji.character) ?? [];

      const on_examples: IWord[] = [];
      for (const w of words) {
        if (on_examples.length >= 3) break;
        const matches = kanji.onyomi.some((on) =>
          matchesReading(w.reading, on)
        );
        if (matches) on_examples.push(w);
      }

      const kun_examples: IWord[] = [];
      for (const w of words) {
        if (kun_examples.length >= 3) break;
        const matches = kanji.kunyomi.some((kun) =>
          matchesReading(w.reading, kun)
        );
        if (matches) kun_examples.push(w);
      }

      await Kanji.updateOne(
        { _id: kanji._id },
        { $set: { on_examples, kun_examples } }
      );

      enriched++;
      if (enriched % 200 === 0) {
        console.log(`  ${enriched}/${allKanji.length} done...`);
      }
    }

    console.log('Enrichment complete ✅');
    console.log(`  ${enriched} kanji updated`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Enrichment failed:', err);
    process.exit(1);
  }
};

enrich();