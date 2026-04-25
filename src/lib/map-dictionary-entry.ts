import type { DictionaryEntry } from '@prisma/client';
import type { Word } from '@/types/word';

export function dictionaryEntryToWord(row: DictionaryEntry): Word {
  return {
    id: row.id,
    term: row.term,
    definition: row.definition,
    example: row.example,
    tone: row.tone,
    createdAt: row.createdAt,
  };
}
