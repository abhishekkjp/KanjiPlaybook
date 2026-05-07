import type { JLPTLevel } from '../types/kanji';

interface Props {
  activeLevel: JLPTLevel;
  onLevelChange: (level: JLPTLevel) => void;
}

const LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

const LevelTabs = ({ activeLevel, onLevelChange }: Props) => {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {LEVELS.map((level) => (
        <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-200
            ${
              activeLevel === level
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
            }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default LevelTabs;