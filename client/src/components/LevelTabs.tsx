import type { JLPTLevel } from '../types/kanji';

interface Props {
  activeLevel: JLPTLevel;
  onLevelChange: (level: JLPTLevel) => void;
}

const LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

const LevelTabs = ({ activeLevel, onLevelChange }: Props) => {
  return (
    <div className="flex  bg-black  justify-center flex-wrap">
      
      {LEVELS.map((level) => (    
          <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={`px-6 py-2  flex-1 font-bold text-sm text-white transition-all duration-200
            ${
              activeLevel === level
                ? ''
                : ''
            }`}
        >
          {level}
        </button>  
      ))}
     
    </div>
  );
};

export default LevelTabs;