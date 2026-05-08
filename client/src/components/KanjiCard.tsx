import type { Kanji } from '../types/kanji';

interface Props {
  kanji: Kanji;
}

const KanjiCard = ({ kanji }: Props) => {
  return (
    <div className="bg-white  h-full border-3 border-green-700   shadow-sm   flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* character */}
      <div className="text-center p-4">
        <span className="text-5xl font-bold text-gray-800">
          {kanji.character}
        </span>
      </div>

      {/* meaning */}
      <p className="text-center text-white text-sm  font-medium bg-green-700 py-3 ">
        {kanji.meaning}
      </p>

      {/* readings */}
      <div className="text-xs space-y-1 grid grid-cols-2  place-items-center">
           <div>
           {kanji.onyomi.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-gray-400 font-medium">音:</span>
            <span className="text-gray-600">{kanji.onyomi.join('、')}</span>
          </div>
        )}
           </div>


           <div>
           {kanji.kunyomi.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-gray-400 font-medium">訓:</span>
            <span className="text-gray-600">{kanji.kunyomi.join('、')}</span>
          </div>
        )}
           </div>
      </div>

      {/* stroke count */}
      <div className="text-xs text-gray-400 text-right">
        {kanji.strokeCount} strokes
      </div>
    </div>
  );
};

export default KanjiCard;