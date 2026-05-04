import type { EliteWord } from '@/data/elite-words';

export interface EliteResponse {
  type: 'academic' | 'witty' | 'devilish';
  text: string;
  word?: EliteWord;
  sophistication: 'high' | 'elite';
  category: string;
}
