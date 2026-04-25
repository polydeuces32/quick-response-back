'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import WordCard from "@/components/WordCard";
import { Word } from "@/types/word";

export default function Explorer() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/words');
        if (response.ok) {
          const data = await response.json();
          setWords(data);
        }
      } catch (error) {
        console.error('Error fetching words:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  if (loading) {
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
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Browse our collection of {words.length} rare and devilish words
          </p>
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
