'use client';

import { useState, useEffect } from 'react';
import PhysicsWordCanvas from '@/components/PhysicsWordCanvas';
import WordCard from '@/components/WordCard';
import { Word } from '@/types/word';
import { eliteWords } from '@/data/elite-words';
import { Brain, Zap, GraduationCap, RefreshCw } from 'lucide-react';

export default function PhysicsPlayground() {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [physicsWords, setPhysicsWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const convertedWords: Word[] = eliteWords.map((word, index) => ({
      id: index + 1000,
      term: word.term,
      definition: word.definition,
      example: word.example,
      tone: word.tone,
      createdAt: new Date(),
    }));
    setPhysicsWords(convertedWords.slice(0, 20));
    setIsLoading(false);
  }, []);

  const handleWordClick = (word: Word) => {
    setSelectedWord(word);
  };

  const resetPhysics = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPhysicsWords(prev => [...prev].sort(() => Math.random() - 0.5));
      setIsLoading(false);
    }, 100);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
              PHYSICS PLAYGROUND
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading physics engine...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
            PHYSICS PLAYGROUND
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Interact with elite vocabulary using physics - click and drag words around!
          </p>
          <button
            onClick={resetPhysics}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            RESET PHYSICS
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Physics Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-red-600" />
                INTERACTIVE WORDS
              </h2>
              <div className="h-96">
                <PhysicsWordCanvas
                  words={physicsWords}
                  onWordClick={handleWordClick}
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Click and drag words around! Click on a word to see its details.
              </p>
            </div>
          </div>

          {/* Word Details */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-red-600" />
                WORD DETAILS
              </h2>
              
              {selectedWord ? (
                <div className="space-y-4">
                  <WordCard 
                    word={selectedWord}
                    variant="response"
                  />
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold uppercase tracking-wide text-black dark:text-white mb-2">
                      PHYSICS INFO
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      This word is currently floating in the physics simulation. 
                      You can drag it around or let it bounce naturally!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Click on a word in the physics simulation to see its details here.
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold uppercase tracking-wide text-black dark:text-white mb-4">
                HOW TO PLAY
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Click and drag words around the canvas</li>
                <li>• Words will bounce and interact with each other</li>
                <li>• Click on a word to see its definition and details</li>
                <li>• Use the reset button to scramble the words</li>
                <li>• Try to create interesting word collisions!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Word Categories */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-black dark:text-white text-center mb-12">
            WORD CATEGORIES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 dark:text-blue-200 mb-2">
                MIT TECH
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Engineering and computer science terminology for technical discussions.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold uppercase tracking-wide text-green-800 dark:text-green-200 mb-2">
                HARVARD LAW
              </h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                Legal and philosophical terms for sophisticated intellectual discourse.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold uppercase tracking-wide text-purple-800 dark:text-purple-200 mb-2">
                ACADEMIC
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                High-level academic vocabulary for scholarly conversations.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold uppercase tracking-wide text-red-800 dark:text-red-200 mb-2">
                WITTY
              </h3>
              <p className="text-sm text-red-600 dark:text-red-300">
                Clever and sophisticated terms for witty comebacks and banter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
