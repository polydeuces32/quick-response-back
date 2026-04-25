export interface Word {
  id: number;
  term: string;
  definition: string | null;
  example: string | null;
  tone: string | null;
  createdAt: Date;
}

export interface SuggestedResponse {
  type: 'plain' | 'witty' | 'devilish';
  text: string;
  word?: Word;
}

