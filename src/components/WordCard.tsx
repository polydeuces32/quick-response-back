import { Word } from '@/types/word';

interface WordCardProps {
  word: Word;
  isHero?: boolean;
  variant?: 'hero' | 'grid' | 'response';
  onSave?: (word: Word) => void;
  onShare?: (word: Word) => void;
}

export default function WordCard({ word, isHero = false, variant = 'grid', onSave, onShare }: WordCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${word.term}: ${word.definition}`);
  };

  const getToneStyle = (tone?: string | null) => {
    switch (tone) {
      case 'witty': return 'border-l-4 border-swiss-red';
      case 'sarcastic': return 'border-l-4 border-swiss-gray';
      case 'romantic': return 'border-l-4 border-swiss-red-dark';
      case 'professional': return 'border-l-4 border-swiss-gray-light';
      case 'devilish': return 'border-l-4 border-swiss-black';
      default: return 'border-l-4 border-gray-300';
    }
  };

  if (variant === 'hero' || isHero) {
    return (
      <div className="text-left max-w-6xl mx-auto px-8 py-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-8xl md:text-9xl font-bold uppercase tracking-tight text-black dark:text-white mb-8 leading-none">
            {word.term}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-4xl leading-relaxed">
            {word.definition}
          </p>
          {word.example && (
            <p className="text-lg italic text-gray-500 dark:text-gray-400 mb-8 max-w-4xl">
              &ldquo;{word.example}&rdquo;
            </p>
          )}
          {word.tone && (
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium uppercase tracking-wide mb-8">
              {word.tone.toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => onSave?.(word)}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105"
          >
            SAVE WORD
          </button>
          <button 
            onClick={handleCopy}
            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105"
          >
            COPY
          </button>
          <button 
            onClick={() => onShare?.(word)}
            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-medium uppercase tracking-wide transition-all duration-200 hover:scale-105"
          >
            SHARE
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'response') {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-6 hover:border-red-600 dark:hover:border-red-400 transition-all duration-300">
        <h3 className="text-2xl font-bold uppercase tracking-tight text-black dark:text-white mb-3">
          {word.term}
        </h3>
        {word.definition && (
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {word.definition}
          </p>
        )}
        {word.example && (
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            &ldquo;{word.example}&rdquo;
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-6 hover:border-red-600 dark:hover:border-red-400 transition-all duration-300 hover:scale-105 cursor-pointer ${getToneStyle(word.tone)}`}>
      <div className="mb-4">
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
          {word.term}
        </h3>
        {word.tone && (
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {word.tone}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {word.definition}
      </p>
      
      {word.example && (
        <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          &ldquo;{word.example}&rdquo;
        </p>
      )}
      
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => onSave?.(word)}
          className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          SAVE
        </button>
        <button 
          onClick={handleCopy}
          className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          COPY
        </button>
        <button 
          onClick={() => onShare?.(word)}
          className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          SHARE
        </button>
      </div>
    </div>
  );
}

