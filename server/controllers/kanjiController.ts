import { Request, Response } from 'express';
import Kanji from '../models/Kanji';
import { JLPTLevel } from '../types/kanji';

const VALID_LEVELS: JLPTLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5'];




// GET /api/kanji?level=N3&page=1&limit=50
export const getKanji = async (req: Request, res: Response): Promise<void> => {
  try {
    const level = req.query.level as JLPTLevel;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    if (!level || !VALID_LEVELS.includes(level)) {
      res.status(400).json({ message: 'Valid level required: N1–N5' });
      return;
    }

    const [kanji, total] = await Promise.all([
      Kanji.find({ level }).skip(skip).limit(limit).lean(),
      Kanji.countDocuments({ level }),
    ]);

    res.json({
      kanji,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/kanji/:character
export const getKanjiByCharacter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const kanji = await Kanji.findOne({
      character: req.params.character,
    }).lean();

    if (!kanji) {
      res.status(404).json({ message: 'Kanji not found' });
      return;
    }

    res.json(kanji);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};