import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { dictionaryEntryToWord } from '@/lib/map-dictionary-entry';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ids = await prisma.dictionaryEntry.findMany({
      where: { lexicon: 'main' },
      select: { id: true },
    });
    if (ids.length === 0) {
      return NextResponse.json({ error: 'No words found' }, { status: 404 });
    }

    const pick = ids[Math.floor(Math.random() * ids.length)]!.id;
    const row = await prisma.dictionaryEntry.findUnique({ where: { id: pick } });
    if (!row) {
      return NextResponse.json({ error: 'No words found' }, { status: 404 });
    }

    return NextResponse.json(dictionaryEntryToWord(row));
  } catch (error) {
    console.error('Error fetching random word:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
