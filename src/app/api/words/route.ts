import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { dictionaryEntryToWord } from '@/lib/map-dictionary-entry';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lexicon = searchParams.get('lexicon') ?? 'main';
    const search = searchParams.get('search')?.trim();

    const allowed = ['main', 'elite', 'all'] as const;
    const lex = allowed.includes(lexicon as (typeof allowed)[number]) ? lexicon : 'main';

    const where =
      lex === 'all'
        ? search
          ? {
              OR: [
                { term: { contains: search } },
                { definition: { contains: search } },
              ],
            }
          : {}
        : {
            lexicon: lex,
            ...(search
              ? {
                  OR: [
                    { term: { contains: search } },
                    { definition: { contains: search } },
                  ],
                }
              : {}),
          };

    const rows = await prisma.dictionaryEntry.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(rows.map(dictionaryEntryToWord));
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
