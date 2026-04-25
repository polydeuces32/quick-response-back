'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from "next/link";
import WordCard from "@/components/WordCard";
import { Word } from "@/types/word";

export default function Explorer() {
  const [words, setWords] = useState<Word[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [searchBusy, setSearchBusy] = useState(false);
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const firstFetch = useRef(true);

  const fetchWords = useCallback(async (q: string) => {
    if (firstFetch.current) setInitializing(true);
    else setSearchBusy(true);
    setLoadError(null);
    try {
      const params = new URLSearchParams({ lexicon: 'main' });
      if (q.trim()) params.set('search', q.trim());
      const response = await fetch(`/api/words?${params.toString()}`);
      if (!response.ok) throw new Error('Request failed');
      const data: Word[] = await response.json();
      setWords(
        data.map((w) => ({
          ...w,
          createdAt: w.createdAt instanceof Date ? w.createdAt : new Date(String(w.createdAt)),
        }))
      );
    } catch (error) {
      console.error('Error fetching words:', error);
      setLoadError('Could not load words. Ensure DATABASE_URL is set and run: npx prisma db push && npx prisma db seed');
      setWords([]);
    } finally {
      if (firstFetch.current) {
        firstFetch.current = false;
        setInitializing(false);
      } else {
        setSearchBusy(false);
      }
    }
  }, []);

  useEffect(() => {
    const delay = search.trim() ? 280 : 0;
    const t = window.setTimeout(() => {
      void fetchWords(search);
    }, delay);
    return () => window.clearTimeout(t);
  }, [search, fetchWords]);

  if (initializing) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
              WORD EXPLORER
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading words...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
            WORD EXPLORER
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Browse words from the local SQLite dictionary (main lexicon). Use search to surface new matches.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wide">
            {searchBusy ? 'Searching…' : `${words.length} match${words.length === 1 ? '' : 'es'}`}
          </p>
          <div className="max-w-xl mx-auto mb-8">
            <label htmlFor="explorer-search" className="sr-only">
              Search words
            </label>
            <input
              id="explorer-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search term or definition…"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
            />
          </div>
          {loadError && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-6 max-w-xl mx-auto">{loadError}</p>
          )}
          <Link 
            href="/" 
            className="inline-block px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105"
          >
            ← BACK TO HOME
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {words.map((word) => (
            <WordCard 
              key={word.id} 
              word={word}
              onSave={(word) => console.log('Saving word:', word)}
              onShare={(word) => console.log('Sharing word:', word)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
