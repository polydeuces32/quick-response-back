'use client';

import { useState } from 'react';
import { getEliteWordsByTone, eliteWordToWord, type EliteWord } from '@/data/elite-words';
import { Copy, Heart, RefreshCw, Sparkles, Brain, GraduationCap, Zap } from 'lucide-react';
import WordCard from './WordCard';

interface EliteResponse {
  type: 'academic' | 'witty' | 'devilish';
  text: string;
  word: EliteWord;
  sophistication: 'high' | 'elite';
  category: string;
}

interface EliteResponseGeneratorProps {
  onSaveResponse?: (response: EliteResponse) => void;
}

export default function EliteResponseGenerator({ onSaveResponse }: EliteResponseGeneratorProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [suggestedResponses, setSuggestedResponses] = useState<EliteResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEliteResponses = () => {
    if (!inputMessage.trim()) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      const academicWords = getEliteWordsByTone('professional');
      const wittyWords = getEliteWordsByTone('witty');
      const devilishWords = getEliteWordsByTone('sarcastic');

      const responses: EliteResponse[] = [
        {
          type: 'academic',
          text: generateAcademicResponse(inputMessage, academicWords[Math.floor(Math.random() * academicWords.length)]),
          word: academicWords[Math.floor(Math.random() * academicWords.length)],
          sophistication: 'elite',
          category: 'academic'
        },
        {
          type: 'witty',
          text: generateWittyResponse(inputMessage, wittyWords[Math.floor(Math.random() * wittyWords.length)]),
          word: wittyWords[Math.floor(Math.random() * wittyWords.length)],
          sophistication: 'high',
          category: 'witty'
        },
        {
          type: 'devilish',
          text: generateDevilishResponse(inputMessage, devilishWords[Math.floor(Math.random() * devilishWords.length)]),
          word: devilishWords[Math.floor(Math.random() * devilishWords.length)],
          sophistication: 'elite',
          category: 'devilish'
        }
      ];

      setSuggestedResponses(responses);
      setIsGenerating(false);
    }, 2000);
  };

  const generateAcademicResponse = (message: string, word: EliteWord) => {
    const templates = [
      `Your message demonstrates a rather ${word.term.toLowerCase()} approach to discourse. While your ${word.definition?.toLowerCase() || 'perspective'} is noted, it lacks the necessary intellectual rigor for meaningful engagement.`,
      `I find your communication style to be somewhat ${word.term.toLowerCase()}. Your ${word.definition?.toLowerCase() || 'methodology'} suggests a superficial understanding of the subject matter.`,
      `Your argument, while ${word.term.toLowerCase()}, fails to address the fundamental epistemological questions at hand. The ${word.definition?.toLowerCase() || 'framework'} you've employed is insufficient for this level of discourse.`,
      `While I appreciate your ${word.term.toLowerCase()} perspective, your ${word.definition?.toLowerCase() || 'analysis'} reveals a rather elementary grasp of the complexities involved.`,
      `Your message exhibits a ${word.term.toLowerCase()} quality that, while interesting, does not contribute meaningfully to the intellectual discourse. The ${word.definition?.toLowerCase() || 'approach'} lacks the sophistication required for serious consideration.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const generateWittyResponse = (message: string, word: EliteWord) => {
    const templates = [
      `Ah, how ${word.term.toLowerCase()} of you to say that! Your ${word.definition?.toLowerCase() || 'observation'} is quite the intellectual treat, though perhaps a bit too obvious for someone of your supposed caliber.`,
      `Your ${word.term.toLowerCase()} wit is showing, though it is rather ${word.definition?.toLowerCase() || 'predictable'}. I would expect more from someone who claims to be intellectually sophisticated.`,
      `That is a delightfully ${word.term.toLowerCase()} way to put it. Your ${word.definition?.toLowerCase() || 'commentary'} adds just the right amount of intellectual spice to this otherwise mundane exchange.`,
      `How ${word.term.toLowerCase()} of you! Your ${word.definition?.toLowerCase() || 'insight'} is as refreshing as it is unexpected, though perhaps not as profound as you might think.`,
      `Your ${word.term.toLowerCase()} approach to this conversation is quite ${word.definition?.toLowerCase() || 'entertaining'}. I must say, your intellectual gymnastics are rather impressive, if not entirely convincing.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const generateDevilishResponse = (message: string, word: EliteWord) => {
    const templates = [
      `Your ${word.term.toLowerCase()} attitude is quite the spectacle. Your ${word.definition?.toLowerCase() || 'behavior'} suggests either profound ignorance or deliberate obtuseness - I am not sure which is more ${word.term.toLowerCase()}.`,
      `How ${word.term.toLowerCase()} of you to grace us with your presence. Your ${word.definition?.toLowerCase() || 'contribution'} is as valuable as it is ${word.term.toLowerCase()} - which is to say, not at all.`,
      `Your ${word.term.toLowerCase()} display of intellectual superiority is rather ${word.definition?.toLowerCase() || 'transparent'}. Perhaps you should focus on substance rather than ${word.term.toLowerCase()} posturing.`,
      `That is quite the ${word.term.toLowerCase()} statement you have made there. Your ${word.definition?.toLowerCase() || 'logic'} is as sound as your ${word.term.toLowerCase()} reasoning - which is to say, completely flawed.`,
      `Your ${word.term.toLowerCase()} approach to this discussion is both ${word.definition?.toLowerCase() || 'amusing'} and ${word.term.toLowerCase()}. I would suggest a course in basic logic, but I am not sure even that would help.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
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
        
        <div className="flex justify-between items-center">
          <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {inputMessage.length} CHARACTERS
          </div>
          <button
            onClick={generateEliteResponses}
            disabled={!inputMessage.trim() || isGenerating}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                GENERATING ELITE RESPONSES...
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

      {/* Suggested Responses */}
      {suggestedResponses.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-black dark:text-white text-center mb-12">
            ELITE RESPONSES
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
