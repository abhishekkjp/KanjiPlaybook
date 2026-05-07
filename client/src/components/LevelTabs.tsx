import type { JLPTLevel } from '../types/kanji';

interface Props {
  activeLevel: JLPTLevel;
  onLevelChange: (level: JLPTLevel) => void;
}

const LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

const LevelTabs = ({ activeLevel, onLevelChange }: Props) => {
  return (
    <div className="flex  px-1 py-2 bg-black  justify-center flex-wrap rounded-sm">
      
      {LEVELS.map((level) => (    
          <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={`px-6 py-2  flex-1 font-bold cursor-pointer text-sm text-white relative transition-all duration-200
            ${
              activeLevel === level
                ? 'bg-gray-700 text-white rounded-md shadow-lg [text-shadow:0_0_8px_rgba(255,255,255,0.9)]'
                : 'text-gray-400 hover:text-white'
            }`}
        >
          {level}
        </button>  
      ))}
     
    </div>
  );
};

export default LevelTabs;