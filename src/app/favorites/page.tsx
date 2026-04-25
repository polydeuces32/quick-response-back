'use client';

import { useState, useEffect } from 'react';
import WordCard from '@/components/WordCard';
import { Word, SuggestedResponse } from '@/types/word';
import { Heart, Trash2, Copy, Share2, BookOpen, MessageSquare } from 'lucide-react';

export default function Favorites() {
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
  const [favoriteResponses, setFavoriteResponses] = useState<SuggestedResponse[]>([]);
  const [activeTab, setActiveTab] = useState<'words' | 'responses'>('words');

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedWords = localStorage.getItem('favoriteWords');
    const savedResponses = localStorage.getItem('favoriteResponses');
    
    if (savedWords) {
      setFavoriteWords(JSON.parse(savedWords));
    }
    
    if (savedResponses) {
      setFavoriteResponses(JSON.parse(savedResponses));
    }
  }, []);

  const removeWord = (wordId: number) => {
    const updatedWords = favoriteWords.filter(word => word.id !== wordId);
    setFavoriteWords(updatedWords);
    localStorage.setItem('favoriteWords', JSON.stringify(updatedWords));
  };

  const removeResponse = (responseIndex: number) => {
    const updatedResponses = favoriteResponses.filter((_, index) => index !== responseIndex);
    setFavoriteResponses(updatedResponses);
    localStorage.setItem('favoriteResponses', JSON.stringify(updatedResponses));
  };

  const handleCopyResponse = (response: SuggestedResponse) => {
    navigator.clipboard.writeText(response.text);
  };

  const handleShareResponse = (response: SuggestedResponse) => {
    if (navigator.share) {
      navigator.share({
        title: `${response.type} Response`,
        text: response.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(response.text);
    }
  };

  const getResponseTypeColor = (type: string) => {
    switch (type) {
      case 'plain': return 'border-gray-200 bg-gray-50';
      case 'witty': return 'border-blue-200 bg-blue-50';
      case 'devilish': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
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
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
            YOUR FAVORITES
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your saved words and responses for quick access
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setActiveTab('words')}
              className={`px-8 py-4 font-medium uppercase tracking-wide transition-all duration-200 flex items-center gap-3 ${
                activeTab === 'words'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              WORDS ({favoriteWords.length})
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className={`px-8 py-4 font-medium uppercase tracking-wide transition-all duration-200 flex items-center gap-3 ${
                activeTab === 'responses'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              RESPONSES ({favoriteResponses.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'words' ? (
          <div>
            {favoriteWords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteWords.map((word) => (
                  <div key={word.id} className="relative">
                    <WordCard
                      word={word}
                      isHero={false}
                      onSave={() => {}}
                      onShare={() => {}}
                    />
                    <button
                      onClick={() => removeWord(word.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Heart className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No favorite words yet</h3>
                <p className="text-secondary mb-6">
                  Start exploring words and save your favorites to see them here.
                </p>
                <a href="/explorer" className="btn-primary">
                  Explore Words
                </a>
              </div>
            )}
          </div>
        ) : (
          <div>
            {favoriteResponses.length > 0 ? (
              <div className="space-y-6">
                {favoriteResponses.map((response, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-6 relative ${getResponseTypeColor(response.type)}`}
                  >
                    <button
                      onClick={() => removeResponse(index)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getResponseTypeIcon(response.type)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground capitalize">
                            {response.type} Response
                          </h3>
                          {response.word && (
                            <p className="text-sm text-secondary">
                              Featuring: <span className="font-medium text-accent">{response.word.term}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyResponse(response)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy response"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShareResponse(response)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Share response"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-foreground leading-relaxed">{response.text}</p>
                    </div>
                    
                    {response.word && (
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">
                              {response.word.term}
                            </h4>
                            <p className="text-sm text-secondary mb-2">
                              {response.word.definition}
                            </p>
                            {response.word.example && (
                              <p className="text-sm italic text-secondary-light">
                                &ldquo;{response.word.example}&rdquo;
                              </p>
                            )}
                          </div>
                          {response.word.tone && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              response.word.tone === 'witty' ? 'text-blue-600 bg-blue-100' :
                              response.word.tone === 'sarcastic' ? 'text-red-600 bg-red-100' :
                              response.word.tone === 'romantic' ? 'text-pink-600 bg-pink-100' :
                              response.word.tone === 'professional' ? 'text-green-600 bg-green-100' :
                              'text-purple-600 bg-purple-100'
                            }`}>
                              {response.word.tone}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MessageSquare className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No favorite responses yet</h3>
                <p className="text-secondary mb-6">
                  Generate some responses and save your favorites to see them here.
                </p>
                <a href="/search" className="btn-primary">
                  Generate Responses
                </a>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {(favoriteWords.length > 0 || favoriteResponses.length > 0) && (
          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Your Collection Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">{favoriteWords.length}</div>
                  <div className="text-sm text-secondary">Favorite Words</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">{favoriteResponses.length}</div>
                  <div className="text-sm text-secondary">Saved Responses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {favoriteWords.filter(word => word.tone === 'witty').length}
                  </div>
                  <div className="text-sm text-secondary">Witty Words</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {favoriteWords.filter(word => word.tone === 'devilish').length}
                  </div>
                  <div className="text-sm text-secondary">Devilish Words</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

