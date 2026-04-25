'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WordCard from './WordCard';
import { Word } from '@/types/word';

export default function HomePage() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const fetchRandomWord = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/random-word');
      if (response.ok) {
        const word = await response.json();
        setCurrentWord(word);
      } else {
        const errorText = await response.text();
        console.error('API error', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchRandomWord();
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold uppercase tracking-tight text-black dark:text-white mb-8">
            QUICK RESPONSE BACK
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            DISCOVER WITTY WORDS AND QUICK RESPONSES
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <div className="mt-4 text-sm text-gray-500">Loading…</div>
        </div>
      </main>
    );
  }

  const handleSaveWord = (word: Word) => {
    // TODO: Implement save functionality
    void word;
  };

  const handleShareWord = (word: Word) => {
    // TODO: Implement share functionality
    void word;
  };

  if (!currentWord) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold uppercase tracking-tight text-black dark:text-white mb-8">
            QUICK RESPONSE BACK
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            DISCOVER WITTY WORDS AND QUICK RESPONSES
          </p>
          <button 
            onClick={fetchRandomWord}
            disabled={loading}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'LOADING...' : 'GET RANDOM WORD'}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <WordCard 
        word={currentWord} 
        isHero={true}
        onSave={handleSaveWord}
        onShare={handleShareWord}
      />
      
      <div className="max-w-6xl mx-auto px-8 pb-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={fetchRandomWord}
            disabled={loading}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'LOADING...' : 'NEW WORD'}
          </button>
          <Link 
            href="/explorer"
            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 text-center"
          >
            WORD EXPLORER
          </Link>
          <Link 
            href="/search"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 text-center"
          >
            GENERATE RESPONSES
          </Link>
        </div>
      </div>
    </main>
  );
}
