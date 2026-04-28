import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

const debug = async (): Promise<void> => {
  const xmlPath = path.join(__dirname, 'kanjidic2.xml');
  const xml = fs.readFileSync(xmlPath, 'utf-8');
  const parsed = await xml2js.parseStringPromise(xml);
  const characters = parsed.kanjidic2.character;

  const jlptValues = new Set<string>();

  for (const char of characters) {
    const jlpt = char.misc?.[0]?.jlpt?.[0];
    if (jlpt) jlptValues.add(jlpt);
  }

  console.log('Raw JLPT values found in XML:', [...jlptValues]);
};

debug();