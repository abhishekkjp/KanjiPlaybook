import { useState } from 'react';
import type  { JLPTLevel } from '../types/kanji';
import LevelTabs from '../components/LevelTabs';
import KanjiGrid from '../components/KanjiGrid';
import useKanji from '../hooks/useKanji';

const Home = () => {
  const [activeLevel, setActiveLevel] = useState<JLPTLevel>('N5');
  const { kanji, loading, error, total, totalPages, page, setPage } =
    useKanji(activeLevel);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center tracking-tight">
            漢字 Playbook
          </h1>
          <LevelTabs activeLevel={activeLevel} onLevelChange={setActiveLevel} />
        </div>
      </header>

      {/* main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* stats */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            {total} kanji in {activeLevel}
          </p>
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
        </div>

        <KanjiGrid kanji={kanji} loading={loading} error={error} />

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;