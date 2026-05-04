'use client';

import { useState } from 'react';
import { eliteWordToWord } from '@/data/elite-words';
import { buildEliteResponses } from '@/lib/respond-to-message';
import type { EliteResponse } from '@/types/elite-response';
import { Copy, Heart, RefreshCw, Sparkles, Brain, GraduationCap, Zap } from 'lucide-react';
import WordCard from './WordCard';

interface EliteResponseGeneratorProps {
  onSaveResponse?: (response: EliteResponse) => void;
}

const AI_TONES: Array<EliteResponse['type']> = ['academic', 'witty', 'devilish'];

async function fetchAIResponse(message: string, tone: string): Promise<string> {
  const res = await fetch('/api/ai-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, tone }),
  });
  if (!res.ok) throw new Error('AI request failed');
  const data = await res.json() as { text: string };
  return data.text;
}

export default function EliteResponseGenerator({ onSaveResponse }: EliteResponseGeneratorProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [suggestedResponses, setSuggestedResponses] = useState<EliteResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  const generateEliteResponses = async () => {
    if (!inputMessage.trim()) return;

    setIsGenerating(true);

    if (aiMode) {
      try {
        const [academicText, wittyText, devilishText] = await Promise.all(
          AI_TONES.map((tone) => fetchAIResponse(inputMessage, tone))
        );
        setSuggestedResponses([
          { type: 'academic', text: academicText, sophistication: 'elite', category: 'academic' },
          { type: 'witty',    text: wittyText,    sophistication: 'high',  category: 'witty'    },
          { type: 'devilish', text: devilishText, sophistication: 'elite', category: 'devilish' },
        ]);
      } catch {
        setSuggestedResponses([]);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuggestedResponses(buildEliteResponses(inputMessage));
    }

    setIsGenerating(false);
  };

  const handleCopyResponse = (response: EliteResponse) => {
    navigator.clipboard.writeText(response.text);
  };

  const handleSaveResponse = (response: EliteResponse) => {
    if (onSaveResponse) {
      onSaveResponse(response);
    }
  };

  const getResponseTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <GraduationCap className="w-6 h-6" />;
      case 'witty': return <Brain className="w-6 h-6" />;
      case 'devilish': return <Zap className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const getResponseTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'witty': return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'devilish': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-8">
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
        
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {inputMessage.length} CHARACTERS
          </div>
          <div className="flex items-center gap-4">
            {/* AI Mode toggle */}
            <button
              onClick={() => setAiMode((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 border-2 font-medium uppercase tracking-wide text-sm transition-colors duration-200 ${
                aiMode
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400'
              }`}
              title="Use Claude AI to generate responses instead of templates"
            >
              <Sparkles className="w-4 h-4" />
              AI MODE {aiMode ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={generateEliteResponses}
              disabled={!inputMessage.trim() || isGenerating}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {aiMode ? 'CLAUDE IS WRITING…' : 'GENERATING ELITE RESPONSES...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  GENERATE ELITE RESPONSES
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Responses */}
      {suggestedResponses.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-black dark:text-white text-center mb-12">
            {aiMode ? 'AI-GENERATED RESPONSES' : 'ELITE RESPONSES'}
          </h2>
          
          {suggestedResponses.map((response, index) => (
            <div
              key={index}
              className={`border-2 p-8 bg-white dark:bg-slate-800 ${getResponseTypeColor(response.type)}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-red-600 dark:text-red-400">
                    {getResponseTypeIcon(response.type)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white">
                      {response.type.toUpperCase()} RESPONSE
                    </h3>
                    <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {response.sophistication.toUpperCase()} • {response.category.toUpperCase()}
                    </p>
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
                  word={eliteWordToWord(response.word)}
                  variant="response"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
