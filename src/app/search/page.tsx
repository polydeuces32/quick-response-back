'use client';

import { useState } from 'react';
import words from '@/data/words.json';
import { eliteWordToWord } from '@/data/elite-words';
import { buildBasicResponses } from '@/lib/respond-to-message';
import { SuggestedResponse, Word } from '@/types/word';
import { Copy, Heart, RefreshCw, Sparkles, Brain } from 'lucide-react';
import WordCard from '@/components/WordCard';
import EliteResponseGenerator from '@/components/EliteResponseGenerator';

export default function Search() {
  const [inputMessage, setInputMessage] = useState('');
  const [suggestedResponses, setSuggestedResponses] = useState<SuggestedResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [responseMode, setResponseMode] = useState<'basic' | 'elite'>('elite');

  const generateResponses = () => {
    if (!inputMessage.trim()) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      const pool = (words as unknown as Word[]).map((w) => ({
        ...w,
        createdAt: w.createdAt instanceof Date ? w.createdAt : new Date(String(w.createdAt)),
      }));
      setSuggestedResponses(buildBasicResponses(inputMessage, pool));
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopyResponse = (response: SuggestedResponse) => {
    navigator.clipboard.writeText(response.text);
  };

  const handleSaveResponse = (response: SuggestedResponse) => {
    const savedResponses = JSON.parse(localStorage.getItem('favoriteResponses') || '[]');
    const isAlreadySaved = savedResponses.some((savedResponse: SuggestedResponse) => 
      savedResponse.text === response.text
    );
    
    if (!isAlreadySaved) {
      const updatedResponses = [...savedResponses, response];
      localStorage.setItem('favoriteResponses', JSON.stringify(updatedResponses));
    }
  };

  const getResponseTypeColor = (type: string) => {
    switch (type) {
      case 'plain': return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20';
      case 'witty': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'devilish': return 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getResponseTypeIcon = (type: string) => {
    switch (type) {
      case 'plain': return '💬';
      case 'witty': return '😏';
      case 'devilish': return '😈';
      default: return '💬';
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
            RESPONSE GENERATOR
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Paste a message—replies quote your text, adapt to simple cues (thanks / question / apology / complaint), and weave in vocabulary.
          </p>
          
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-1">
              <button
                onClick={() => setResponseMode('elite')}
                className={`px-8 py-4 font-medium uppercase tracking-wide transition-all duration-200 flex items-center gap-3 ${
                  responseMode === 'elite'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <Brain className="w-5 h-5" />
                ELITE MODE
              </button>
              <button
                onClick={() => setResponseMode('basic')}
                className={`px-8 py-4 font-medium uppercase tracking-wide transition-all duration-200 flex items-center gap-3 ${
                  responseMode === 'basic'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                BASIC MODE
              </button>
            </div>
          </div>
        </div>

        {/* Content based on mode */}
        {responseMode === 'elite' ? (
          <EliteResponseGenerator
            onSaveResponse={(r) => {
              const asSuggested: SuggestedResponse = {
                type: r.type === 'academic' ? 'plain' : r.type,
                text: r.text,
                word: eliteWordToWord(r.word),
              };
              handleSaveResponse(asSuggested);
            }}
          />
        ) : (
          <>
            {/* Basic Input Section */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-8 mb-12">
              <div className="mb-8">
                <label htmlFor="message" className="block text-lg font-medium uppercase tracking-wide text-black dark:text-white mb-4">
                  PASTE THE MESSAGE YOU RECEIVED:
                </label>
                <textarea
                  id="message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Paste the message you want to respond to here..."
                  className="w-full h-32 px-6 py-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none text-lg"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {inputMessage.length} CHARACTERS
                </div>
                <button
                  onClick={generateResponses}
                  disabled={!inputMessage.trim() || isGenerating}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      GENERATE RESPONSES
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Suggested Responses */}
        {suggestedResponses.length > 0 && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold uppercase tracking-tight text-black dark:text-white text-center mb-12">
              SUGGESTED RESPONSES
            </h2>
            
            {suggestedResponses.map((response, index) => (
              <div
                key={index}
                className={`border-2 p-8 bg-white dark:bg-slate-800 ${getResponseTypeColor(response.type)}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{getResponseTypeIcon(response.type)}</span>
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white">
                        {response.type} RESPONSE
                      </h3>
                      {response.word && (
                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          FEATURING: <span className="font-medium text-red-600 dark:text-red-400">{response.word.term}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCopyResponse(response)}
                      className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-110"
                      title="Copy response"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSaveResponse(response)}
                      className="p-3 text-gray-400 hover:text-red-500 transition-colors hover:scale-110"
                      title="Save response"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900 p-6 mb-6">
                  <p className="text-lg text-black dark:text-white leading-relaxed">{response.text}</p>
                </div>
                
                {response.word && (
                  <WordCard 
                    word={response.word}
                    variant="response"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-20 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-3xl font-bold uppercase tracking-wide text-black dark:text-white mb-8">💡 TIPS FOR BETTER RESPONSES</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white mb-3">PLAIN RESPONSES</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Professional and straightforward replies suitable for formal conversations.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white mb-3">WITTY RESPONSES</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Clever and humorous replies that add personality to your conversations.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white mb-3">DEVILISH RESPONSES</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Sharp and slightly provocative replies for when you want to make an impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
