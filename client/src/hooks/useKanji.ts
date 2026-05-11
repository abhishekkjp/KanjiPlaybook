import { useState, useEffect } from 'react';
import api from '../services/api';
import type  { Kanji, JLPTLevel, KanjiResponse } from '../types/kanji';

interface UseKanjiResult {
  kanji: Kanji[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const useKanji = (level: JLPTLevel): UseKanjiResult => {
  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
   
  console.log(kanji) ; 



  useEffect(() => {
    setPage(1);
  }, [level]);

  useEffect(() => {
    const fetchKanji = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get<KanjiResponse>('/kanji', {
          params: { level, page, limit: 50 },
        });
        setKanji(data.kanji);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to fetch kanji');
      } finally {
        setLoading(false);
      }
    };

    fetchKanji();
  }, [level, page]);

  return { kanji, loading, error, total, totalPages, page, setPage };
};

export default useKanji;