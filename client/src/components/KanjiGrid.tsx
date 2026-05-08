import type { Kanji } from '../types/kanji';
import KanjiCard from './KanjiCard';

interface Props {
  kanji: Kanji[];
  loading: boolean;
  error: string | null;
}

const KanjiGrid = ({ kanji, loading, error }: Props) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl h-40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-20">{error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 auto-rows-fr border border-gray-300">
      {kanji.map((k) => (
           <div className='border border-gray-300 p-5'>
             <KanjiCard key={k._id} kanji={k} />
           </div>
      ))}
    </div>
  );
};

export default KanjiGrid;