import type { Kanji } from '../types/kanji';

interface Props {
  kanji: Kanji;
}

const KanjiCard = ({ kanji }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* character */}
      <div className="text-center">
        <span className="text-5xl font-bold text-gray-800">
          {kanji.character}
        </span>
      </div>

      {/* meaning */}
      <p className="text-center text-sm text-indigo-600 font-medium">
        {kanji.meaning}
      </p>

      {/* readings */}
      <div className="text-xs space-y-1">
        {kanji.onyomi.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-gray-400 font-medium">音:</span>
            <span className="text-gray-600">{kanji.onyomi.join('、')}</span>
          </div>
        )}
        {kanji.kunyomi.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-gray-400 font-medium">訓:</span>
            <span className="text-gray-600">{kanji.kunyomi.join('、')}</span>
          </div>
        )}
      </div>

      {/* stroke count */}
      <div className="text-xs text-gray-400 text-right">
        {kanji.strokeCount} strokes
      </div>
    </div>
  );
};

export default KanjiCard;